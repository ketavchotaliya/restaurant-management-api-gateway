import { Transaction } from 'sequelize';
import { Users, UsersType } from '../schemas';
import { Users as UserDef } from '../types';

class UsersModel {
  async addOne(usersObj: UserDef, transaction: Transaction | undefined = undefined): Promise<UserDef> {
    try {
      const insertedObj = await Users.create(usersObj, {
        transaction: transaction ? transaction : undefined,
      });
      return insertedObj;
    } catch (error) {
      throw error;
    }
  }

  async addMany(usersArr: UserDef[], transaction: Transaction | undefined = undefined): Promise<UserDef[]> {
    try {
      return await Users.bulkCreate(usersArr, { transaction: transaction ? transaction : undefined });
    } catch (error) {
      throw error;
    }
  }

  async getSingle(whereObj: any): Promise<UserDef | null> {
    try {
      return await Users.findOne({
        where: whereObj,
      });
    } catch (error) {
      throw error;
    }
  }

  async updateOne(whereObj: {}, userObj: UserDef, transaction: Transaction | undefined = undefined): Promise<any> {
    try {
      await Users.update(userObj, {
        where: {},
        transaction: transaction ? transaction : undefined,
      });
      return;
    } catch (error) {
      throw error;
    }
  }

  async getTotal(condition: any = {}): Promise<number> {
    try {
      const count: number = await Users.count({
        where: condition,
      });
      return count;
    } catch (error) {
      throw error;
    }
  }

  async getMany(condition: any = {}, attributes: string[] = [], other: object = {}): Promise<UserDef[]> {
    try {
      return await Users.findAll({
        attributes: attributes.length > 0 ? attributes : undefined,
        where: condition,
        ...other,
      });
    } catch (error) {
      throw error;
    }
  }
}

export default new UsersModel();
