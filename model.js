import { DataTypes, Model } from "sequelize";
import sequelize from "./database/config/connection.js";


class Users extends Model {
    static associate(models) {
        this.hasMany(models.Posts, {
            as: "Posts",
            foreignKey: "userId"
        });
        this.hasMany(models.Comments, {
            as: "Comments",
            foreignKey: "userId"
        });
        this.hasMany(models.Likes, {
            as: "Likes",
            foreignKey: "userId"
        });
    }
}

Users.init({
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
    modelName: "Users",
    timestamps: true,
    paranoid: true,
});

export default Users;
