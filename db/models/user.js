import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../config.js";


class User extends Model {};

User.init({
    userId: {
        type: DataTypes.SMALLINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    nickname: {
        type: DataTypes.TEXT('tiny'),
        defaultValue: "whoami",
    },
    password: {
        type: DataTypes.TEXT('tiny'),
        allowNull: false,
    },
    likes: {
        type: DataTypes.JSON,
        defaultValue: [],
    },
}, {
    sequelizeConnection,
    modelName: "User",
    timestamps: true,
    paranoid: true,
});

// (async()=> {
//     console.log("!!!");
//     await UserModel.sync({ alter: true });
// })();


export default User;