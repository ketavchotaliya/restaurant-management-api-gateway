import { Model, DataTypes } from 'sequelize';
import sequelize from '../../../utils/dbConfig';

class Users extends Model {
  public user_id!: number;
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public password!: string;
  public user_type_id!: number;
  public session_id!: string;
  public is_active!: number;
  public created_at!: Date;
  public updated_at!: Date;
}

Users.init(
  {
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: new DataTypes.STRING(),
    },
    last_name: {
      type: new DataTypes.STRING(),
    },
    email: {
      type: new DataTypes.STRING(),
      allowNull: false,
    },
    password: {
      type: new DataTypes.STRING(),
    },
    user_type_id: {
      type: new DataTypes.BIGINT().UNSIGNED,
      allowNull: false,
    },
    session_id: {
      type: new DataTypes.STRING(),
    },
    is_active: {
      type: new DataTypes.TINYINT(),
      defaultValue: 1,
    },
    created_at: {
      type: new DataTypes.DATE(),
    },
    updated_at: {
      type: new DataTypes.DATE(),
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: false,
  }
);

export default Users;
