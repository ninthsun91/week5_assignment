import { DataTypes, Model } from "sequelize";
import sequelize from "../config.js";


class Post extends Model {
    static associate(models) {
        this.belongsTo(models.Users, {
            foreignKey: "userId",
        });
        this.hasMany(models.Comments, {
            as: "Comments",
            foreignKey: "postId",
        });
        this.hasMany(models.Likes, {
            as: "Likes",
            foreignKey: "postId",
        });
    }
};

Post.init({
    postId: {
        type: DataTypes.SMALLINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.SMALLINT.UNSIGNED,
        references: {
            model: "Users",
            key: "userId",
        }
    },
    title: {
        type: DataTypes.TEXT("tiny"),
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT("medium"),
        allowNull: false,
    },
}, {
    sequelize,
    modelName: "Post",
    timestamps: true,
    paranoid: false,
});

// (async()=>{
//     console.log("SYNC POSTS");
//     await Post.sync();
// }) ();


export default Post;