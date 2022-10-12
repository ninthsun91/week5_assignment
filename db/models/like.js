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
    });
}