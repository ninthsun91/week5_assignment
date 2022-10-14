import { syncTables } from "../../database/repositories/manage.mjs";

export async function sync(req, res, next) {
    try {
        await syncTables();
    
        res.status(200).json({
            message: "TABLE SYNCED",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}