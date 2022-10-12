import { DataTypes } from "sequelize";


export default function Comments(sequelize) {
    sequelize.define("Comments", {
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
            }
        },
        userId: {
            type: DataTypes.SMALLINT.UNSIGNED,
            allowNull: false,
            references: {
                model: "Users",
                key: "userId",
            }
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },{
        timestamps: true,
        paranoid: true,
    });
}

// import { DataTypes, Model } from "sequelize";
// import sequelize from "../config.js";


// class Comments extends Model {
//     static associate(models) {
//         this.belongsTo(models.Users, {
//             foreignKey: "userId",
//         });
//         this.belongsTo(models.Posts, {
//             foreignKey: "postId",
//         });
//     }
// };

// Comments.init({
//     commentId: {
//         type: DataTypes.SMALLINT.UNSIGNED,
//         autoIncrement: true,
//         primaryKey: true,
//     },
//     postId: {
//         type: DataTypes.SMALLINT.UNSIGNED,
//         references: {
//             model: "Posts",
//             key: "postId",
//         }
//     },
//     userId: {
//         type: DataTypes.SMALLINT.UNSIGNED,
//         references: {
//             model: "Users",
//             key: "userId",
//         }
//     },
//     comment: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
// },{
//     sequelize,
//     modelName: "Comments",
//     timestamps: true,
//     paranoid: true,
// });


// export default Comments;