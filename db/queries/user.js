// import sequelize from "../config.js";
import UserModel from "../models/user.js";
import { Op } from "sequelize";


export async function findOne(ID) {
    console.log("USER FINDONE");
    const result = await UserModel.findOne({
        where: { 
            [Op.or]: [
                { userId: ID },
                { nickname: ID }
            ]
         }
    });
    return result!==null ? result.get() : null;
}

export async function createOne(user) {
    console.log("USER CREATEONE");
    try {
        const result = await UserModel.create(user);
        return {
            user: result.get(),
            isNewRecord: result._options.isNewRecord,
        }
        
    } catch (error) {
        if (error.parent.code === "ER_DUP_ENTRY") {
            return {
                user: {},
                isNewRecord: false,
            }
        };
    }
}