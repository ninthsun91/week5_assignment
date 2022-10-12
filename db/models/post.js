import { DataTypes } from "sequelize";


export default function Posts(sequelize) {
    sequelize.define("Posts", {
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
        timestamps: true,
        paranoid: false,
    });
}