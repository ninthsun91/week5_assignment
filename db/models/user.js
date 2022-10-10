import { DataTypes, Model } from "sequelize";
import sequelize from "../config.js";


class User extends Model {
    static associate(models) {
        this.hasMany(models.Posts, {
            as: "Posts",
            foreignKey: "userId",
        });
        this.hasMany(models.Comments, {
            as: "Comments",
            foreignKey: "userId",
        });
        this.hasMany(models.Likes, {
            as: "Likes",
            foreignKey: "userId",
        });
    }
};

User.init({
    userId: {
        type: DataTypes.SMALLINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    nickname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: "User",
    timestamps: true,
    paranoid: true,
});

// (async()=> {
//     console.log("SYNC USERS");
//     await User.sync();
// })();


export default User;