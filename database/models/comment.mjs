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
        timestamps: true,
        paranoid: false,
    });
}