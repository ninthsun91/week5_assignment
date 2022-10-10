import { Sequelize } from "sequelize";
import env from "../config.env.js";


const sequelizeConnection = new Sequelize(
    env.DB_NAME,
    env.DB_USER,
    env.DB_PASSWORD,
    {
        dialect: "mysql",
        host: env.DB_HOST,
    }
)


export default sequelizeConnection;