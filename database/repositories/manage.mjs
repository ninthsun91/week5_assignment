import sequelize from "../config.mjs";

export async function syncTables() {
    await sequelize.drop();
    await sequelize.sync();
}