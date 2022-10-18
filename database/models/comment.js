import { DataTypes, Model } from "sequelize";
import sequelize from "../config/connection.js";


class Comments extends Model {
    static associate(models) {
        this.belongsTo(models.Users, {
            foreignKey: "userId",
        });
        this.belongsTo(models.Posts, {
            foreignKey: "postId",
        });
    }
}

Comments.init({
    commentId: {
        type: DataTypes.SMALLINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    postId: {
        type: DataTypes.SMALLINT.UNSIGNED,
        allowNull: false,
        references: {
            model: "Posts",
            key: "postId",
        },
        onDelete: "cascade",
    },
    userId: {
        type: DataTypes.SMALLINT.UNSIGNED,
        allowNull: false,
        references: {
            model: "Users",
            key: "userId",
        },
        onDelete: "cascade",
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    sequelize,
    modelName: "Comments",
    timestamps: true,
    paranoid: false,
});

export default Comments;

// export default function Comments(sequelize) {
//     sequelize.define("Comments", {
//         commentId: {
//             type: DataTypes.SMALLINT.UNSIGNED,
//             autoIncrement: true,
//             primaryKey: true,
//         },
//         postId: {
//             type: DataTypes.SMALLINT.UNSIGNED,
//             allowNull: false,
//             references: {
//                 model: "Posts",
//                 key: "postId",
//             },
//             onDelete: "cascade",
//         },
//         userId: {
//             type: DataTypes.SMALLINT.UNSIGNED,
//             allowNull: false,
//             references: {
//                 model: "Users",
//                 key: "userId",
//             },
//             onDelete: "cascade",
//         },
//         comment: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//     },{
//         timestamps: true,
//         paranoid: false,
//     });
// }