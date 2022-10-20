import Users from "../../database/models/user.js";
import { Op } from "sequelize";

export default class UserRepository {
  constructor(){
    this.User = Users
  }

    findOne = async(ID) => {
        return await this.User.findOne({
            where: { 
                [Op.or]: [
                    { userId: ID },
                    { nickname: ID }
                ]
            },
        });
    }
    
    createOne = async(user) => {
        return await this.User.create(user);
    }
}


// import { models } from "../config.mjs";
// import { Op } from "sequelize";

// const { Users } = models;

// export default class UserRepository {
//     findOne = async(ID) => {
//         return await Users.findOne({
//             where: { 
//                 [Op.or]: [
//                     { userId: ID },
//                     { nickname: ID }
//                 ]
//             },
//         });
//     }
    
//     createOne = async(user) => {
//         return await Users.create(user);
//     }
// }
