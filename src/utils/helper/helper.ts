import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import jwt from 'jsonwebtoken';
import STATUS_CODES from 'http-status-codes';
import uuid from 'uuid';
import { logger } from '../logger';
const BCRYPT_SALT: any = process.env.BCRYPT_SALT;

/**
 * @description Create Response
 * @param {Object} res
 * @param {Number} status
 * @param {String} message
 * @param {Object} payload
 * @param {Object} pager
 */
export const createResponse = (
  res: Response,
  status: number,
  message: string,
  payload: object | null = {},
  pager: object | null = {}
) => {
  const resPager = typeof pager !== 'undefined' ? pager : {};

  return res.status(status).json({
    status,
    message,
    payload,
    pager: resPager,
  });
};

/**
 * @description Send Validation Response
 * @param {Object} res
 * @param {errors} errors - Errors Object
 *
 * @return {*|Sequelize.json|Promise<any>}
 */
export const createValidationResponse = (res: Response, errors: any) => {
  return createResponse(
    res,
    STATUS_CODES.UNPROCESSABLE_ENTITY,
    errors[Object.keys(errors)[0]],
    { error: errors[Object.keys(errors)[0]] },
    {}
  );
};

/**
 * @description Get Default sort Order
 * @param sortOrder
 */
export const getDefaultSortOrder = (sortOrder: string): string => {
  const order: string =
    sortOrder && ['asc', 'desc'].indexOf(sortOrder.toLowerCase()) !== -1
      ? sortOrder.toLowerCase() === 'asc'
        ? 'ASC'
        : 'DESC'
      : 'DESC';
  return order;
};

/**
 * @description Get Hashed String
 * @param value
 */
export const getHashedString = (value: string): string => {
  let hashWithSalt = bcrypt.hashSync(value, BCRYPT_SALT);
  return hashWithSalt;
};

/**
 * @description Get Uniq String
 */
export const uniqString = (uploadedFileExtension: any) => {
  const newName: any = `${uuid.v4()}.${uploadedFileExtension}`;
  return newName;
};

/**
 * @description To make object key useable
 * @param string
 */
export const beautifyKey = (string: string): string => {
  const key: string = string.toLowerCase().replace(' ', '_');
  return key;
};

/**
 * @description Get Leading Zero if single character
 * @param string
 */
export const getLeadingZero = (string: string | number): string => {
  return ('0' + string).slice(-2);
};

/**
 * @description Add leading zero to particular number
 * @param number
 * @param length
 */
export const stringWithZeroes = (number: number, length: number) => {
  var my_string = '' + number;
  while (my_string.length < length) {
    my_string = '0' + my_string;
  }
  return my_string;
};

/**
 * @description Get String initials
 * @param string
 */
export const getStringInitials = (string: string): string => {
  const init: any = string.replace(/[^a-zA-Z ]/g, '').slice(0, 2);
  return init;
};

/**
 * @desc: Get UTC date
 * @param dateObj Date object or string
 */
export const getUTCDate = (dateObj: Date): Date => {
  let date = new Date(dateObj);
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())
  );
};

/**
 * @description Convert Date object to Office date format YYYY-MM-DD
 * @param date
 */
export const convertToDateFormat = (date: Date) =>
  `${date.getFullYear()}-${getLeadingZero(date.getMonth() + 1)}-${getLeadingZero(date.getDate())}`; // Date format conversion

/**
 * @description convert string date to Date Object
 * @param date
 */
export const convertDateStringToDate = (date: string) => {
  try {
    const year = parseInt(date.split('-')[2]);
    const month = parseInt(date.split('-')[1]) - 1;
    const day = parseInt(date.split('-')[0]);
    return new Date(year, month, day);
  } catch (error) {
    throw error;
  }
};

/**
 * It will return random value between min and max value.
 *
 * @return {number}
 */
export const getRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
export const getObjectKeys = (obj: object) => {
  try {
    return Object.keys(obj);
  } catch (err) {
    logger.error(__filename, 'getObjectKeys', '', 'Error in getObjectKeys', JSON.stringify(err.stack));
    throw err;
  }
};
/**
 * @description will generate passworf
 * @param length
 */
export const generatePassword = (length: number) => {
  // Declare a alpha numeric variable
  // which stores all digits
  let smallDigits = 'abcdefghijklmnopqrstuvwxyz';
  let capDigits = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let number = '01234567890123456789';
  let spacialChar = '!@#$%^&';
  let pwd = '';

  for (let i = 0; i < length; i++) {
    if (i == 0) {
      pwd += capDigits[Math.floor(Math.random() * capDigits.length)];
    } else if (i == 4) {
      pwd += spacialChar[Math.floor(Math.random() * spacialChar.length)];
    } else if (i > 4) {
      pwd += number[Math.floor(Math.random() * number.length)];
    } else {
      pwd += smallDigits[Math.floor(Math.random() * smallDigits.length)];
    }
  }
  return pwd;
};
