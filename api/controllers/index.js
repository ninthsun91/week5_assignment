import { syncTables } from "../../db/queries/manage.js";

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