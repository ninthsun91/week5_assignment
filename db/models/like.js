import { DataTypes } from "sequelize";


export default function Likes(sequelize) {
    sequelize.define("Likes", {
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
    });
}

// import { DataTypes, Model } from "sequelize";
// import sequelize from "../config.js";


// class Likes extends Model {
//     static associate(models) {
//         this.belongsTo(models.Users, {
//             foreignKey: "userId",
//         });
//         this.belongsTo(models.Posts, {
//             foreignKey: "postId",
//         });
//     }
// };

// Likes.init({
//     likeId: {
//         type: DataTypes.SMALLINT.UNSIGNED,
//         autoIncrement: true,
//         primaryKey: true,
//     },
//     postId: {
//         type: DataTypes.SMALLINT.UNSIGNED,
//         references: {
//             model: "Posts",
//             key: "postId",
//         },
//         onDelete: "cascade",
//     },
//     userId: {
//         type: DataTypes.SMALLINT.UNSIGNED,
//         references: {
//             model: "Users",
//             key: "userId",
//         },
//         onDelete: "cascade",
//     },
// }, {
//     sequelize,
//     modelName: "Likes",
// });



// export default Likes;