import { NextFunction } from 'express';
import STATUS_CODES from 'http-status-codes';
import { CustomRequest, CustomResponse } from '../environment';
import { createResponse } from '../utils/helper';
import { logger } from '../utils/logger';
import jwt from 'jsonwebtoken';
import usersModel from '../components/Auth/models/users.model';

class JWTMiddleware {
  async generateJWT(userId: any, userEmail: any, sessionId: any, userType: any) {
    try {
      return await jwt.sign(
        {
          user_id: userId,
          email: userEmail,
          session: sessionId,
          userType
        },
        process.env.JWT_SECRET || 'Qwerty@#$%8978',
        {
          expiresIn: process.env.JWT_EXPIRE_TIME || 80000,
        }
      );
    } catch (e) {
      console.error(`Error in generateJWT : ${e}`);
      throw e;
    }
  }

  async verifyToken(token: string) {
    try {
      // split token from bearer keyword
      const tokenData = typeof token.split(' ')[1] === 'undefined' ? token : token.split(' ')[1];
      return await jwt.verify(tokenData, process.env.JWT_SECRET || 'Qwerty@#$%8978');
    } catch (e) {
      console.error('Error in verifyToken : ', e);
      throw e;
    }
  }

  async validateJWT(req: CustomRequest, res: CustomResponse, next: NextFunction) {
    try {
      const token = req.headers.authorization; // Parse token from header

      if (!token) {
        createResponse(res, STATUS_CODES.BAD_REQUEST, 'Access token is required');
        return;
      }

      // verify the jwt token
      let decoded: any;
      try {
        decoded = await this.verifyToken(token);
      } catch (e) {
        console.error(`Error in verifyToken : ${e}`);
        createResponse(res, STATUS_CODES.UNAUTHORIZED, 'UnAuthorized access');
        return;
      }

      if (
        typeof decoded.user_id === 'undefined' ||
        typeof decoded.email === 'undefined' ||
        typeof decoded.session === 'undefined' ||
        typeof decoded.userType === 'undefined'
      ) {
        createResponse(res, STATUS_CODES.UNAUTHORIZED, 'UnAuthorized access');
        return;
      }

      // check user session is alive or not
      let userSession;
      try {
        userSession = await usersModel.getSingle({
          session_id: decoded.session,
        });
      } catch (e) {
        console.error(`Error in findUserSession : ${e}`);
        createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, 'Server Error while validating user session!');
        return;
      }

      if (!userSession) {
        createResponse(res, STATUS_CODES.UNAUTHORIZED, 'UnAuthorized Access!');
        return;
      }

      // add loggedIn user id in request
      req.custom.logged_in_user_id = decoded.user_id;
      req.custom.user_type_id = userSession.user_type_id;

      next();
    } catch (e) {
      console.error(`Error in validateJWT : ${e}`);
      createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, 'Internal server error!');
    }
  }
}

const middlewareObj = new JWTMiddleware();
export default middlewareObj;
