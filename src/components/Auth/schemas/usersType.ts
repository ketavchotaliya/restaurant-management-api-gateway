import { Model, DataTypes } from 'sequelize';
import sequelize from '../../../utils/dbConfig';

class UserTypes extends Model {
  public user_type_id!: number;
  public user_type!: string;
}

UserTypes.init(
  {
    user_type_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_type: {
      type: new DataTypes.STRING(),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'user_types',
    timestamps: false,
  }
);

export default UserTypes;
