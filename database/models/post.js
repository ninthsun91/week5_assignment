import { DataTypes, Model } from "sequelize";
import sequelize from "../config/connection.js";


class Posts extends Model {
    static associate(models) {
        this.belongsTo(models.Users, {
            foreignKey: "userId",
        });
        this.hasMany(models.Comments, {
            as: "Comments",
            foreignKey: "postId"
        });
        this.hasMany(models.Likes, {
            as: "Likes",
            foreignKey: "postId"
        });
    }
}

Posts.init({
    postId: {
        type: DataTypes.SMALLINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
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
    title: {
        type: DataTypes.TEXT("tiny"),
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT("medium"),
        allowNull: false,
    },
    likes: {
        type: DataTypes.SMALLINT.UNSIGNED,
        defaultValue: 0,
    }
}, {
    sequelize,
    modelName: "Posts",
    timestamps: true,
    paranoid: false,
});


sequelize.models.Posts;
export default Posts;


// export default function Posts(sequelize) {
//     sequelize.define("Posts", {
//         postId: {
//             type: DataTypes.SMALLINT.UNSIGNED,
//             autoIncrement: true,
//             primaryKey: true,
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
//         title: {
//             type: DataTypes.TEXT("tiny"),
//             allowNull: false,
//         },
//         content: {
//             type: DataTypes.TEXT("medium"),
//             allowNull: false,
//         },
//         likes: {
//             type: DataTypes.SMALLINT.UNSIGNED,
//             defaultValue: 0,
//         }
//     }, {
//         timestamps: true,
//         paranoid: false,
//     });
// }