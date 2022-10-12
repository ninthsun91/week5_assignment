import { DataTypes, Model } from "sequelize";
// import sequelize from "../config.js";


export default function Posts(sequelize) {
    sequelize.define("Posts", {
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
            },
            onDelete: "cascade"
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
        timestamps: true,
        paranoid: false,
    });
}


// class Posts extends Model {
//     static associate(models) {
//         this.belongsTo(models.Users, {
//             foreignKey: "userId",
//         });
//         this.hasMany(models.Comments, {
//             as: "Comments",
//             foreignKey: "postId",
//         });
//         this.hasMany(models.Likes, {
//             as: "Likes",
//             foreignKey: "postId",
//         });
//     }
// };

// Posts.init({
//     postId: {
//         type: DataTypes.SMALLINT.UNSIGNED,
//         autoIncrement: true,
//         primaryKey: true,
//     },
//     userId: {
//         type: DataTypes.SMALLINT.UNSIGNED,
//         references: {
//             model: "Users",
//             key: "userId",
//         },
//         onDelete: "cascade"
//     },
//     title: {
//         type: DataTypes.TEXT("tiny"),
//         allowNull: false,
//     },
//     content: {
//         type: DataTypes.TEXT("medium"),
//         allowNull: false,
//     },
// }, {
//     sequelize,
//     modelName: "Posts",
//     timestamps: true,
//     paranoid: false,
// });


// export default Posts;