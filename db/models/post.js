import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../config";


class Post extends Model {};

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
    commentIds: {
        type: DataTypes.JSON,
        defaultValue: [],
        references: {
            model: "Comments",
            key: "commentId"
        }
    },
    likes: {},
}, {
    sequelizeConnection,
    modelName: "Post",
    timestamps: true,
    paranoid: true,
});


export default Post;