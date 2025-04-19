import { Sequelize } from "sequelize";

const sequelize = new Sequelize('agriflow', 'postgres', 'admin', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false
})

export default sequelize;
