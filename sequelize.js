import { Sequelize } from 'sequelize';

// Create a new Sequelize instance
const sequelize = new Sequelize('product_management', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;

export const sequelizeConfig = (tableName) => {
  return {
    timestamps: false,
    tableName: tableName,
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
  };
};
