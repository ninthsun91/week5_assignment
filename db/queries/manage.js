import sequelize from "../config.js";

export async function syncTables() {
    await sequelize.drop();
    await sequelize.sync();
}