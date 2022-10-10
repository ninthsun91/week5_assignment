// import sequelize from "../config.js";
import UserModel from "../models/user.js";


export async function userFindOne(userId) {
    console.log("USER FINDONE");
    const result = await UserModel.findOne({
        where: { userId }
    });
    return result!==null ? result.get() : null;
}

export async function userCreateOne(user) {
    console.log("USER CREATEONE");
    const result = await UserModel.create(user);
    return {
        user: result.get(),
        isNewRecord: result._options.isNewRecord,
    }
}

export async function toggleLike() {
    console.log("USER TOGGLELIKE");
}

export async function getLikeList() {
    console.log("USER GETLIKELIST");
}