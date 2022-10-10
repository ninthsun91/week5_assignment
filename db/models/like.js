import { DataTypes, Model } from "sequelize";
import sequelize from "../config.js";


class Like extends Model {
    static associate(models) {
        this.belongsTo(models.Users, {
            foreignKey: "userId",
        });
        this.belongsTo(models.Posts, {
            foreignKey: "postId",
        });
    }
};

Like.init({
    likeId: {
        type: DataTypes.SMALLINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    postId: {
        type: DataTypes.SMALLINT.UNSIGNED,
        references: {
            model: "Posts",
            key: "postId",
        },
        onDelete: "cascade",
    },
    userId: {
        type: DataTypes.SMALLINT.UNSIGNED,
        references: {
            model: "Users",
            key: "userId",
        },
        onDelete: "cascade",
    },
}, {
    sequelize,
    modelName: "Like",
});

// (async()=>{
//     console.log("SYNC LIKE");
//     await Like.sync();
// });


export default Like;