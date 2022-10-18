import Users from "../database/models/user.mjs";
import Posts from "../database/models/post.mjs";
import Comments from "../database/models/comment.mjs";
import Likes from "../database/models/like.mjs";

export default function associateModels() {
    Users.hasMany(Posts, {
        as: "Posts",
        foreignKey: "userId"
    });
    Posts.belongsTo(Users, {
        foreignKey: "userId"
    });

    Users.hasMany(Comments, {
        as: "Comments",
        foreignKey: "userId"
    });
    Comments.belongsTo(Users, {
        foreignKey: "userId"
    });

    Users.hasMany(Likes, {
        as: "Likes",
        foreignKey: "userId"
    });
    Likes.belongsTo(Users, {
        foreignKey: "userId"
    });

    Posts.hasMany(Comments, {
        as: "Comments",
        foreignKey: "postId"
    });
    Comments.belongsTo(Posts, {
        foreignKey: "postId"
    });

    Posts.hasMany(Likes, {
        as: "Likes",
        foreignKey: "postId"
    });
    Likes.belongsTo(Posts, {
        foreignKey: "postId"
    });
}


// export default function associateModels(sequelize) {
//     const { Users, Posts, Comments, Likes } = sequelize.models;

//     Users.hasMany(Posts, {
//         as: "Posts",
//         foreignKey: "userId"
//     });
//     Posts.belongsTo(Users, {
//         foreignKey: "userId"
//     });

//     Users.hasMany(Comments, {
//         as: "Comments",
//         foreignKey: "userId"
//     });
//     Comments.belongsTo(Users, {
//         foreignKey: "userId"
//     });

//     Users.hasMany(Likes, {
//         as: "Likes",
//         foreignKey: "userId"
//     });
//     Likes.belongsTo(Users, {
//         foreignKey: "userId"
//     });

//     Posts.hasMany(Comments, {
//         as: "Comments",
//         foreignKey: "postId"
//     });
//     Comments.belongsTo(Posts, {
//         foreignKey: "postId"
//     });

//     Posts.hasMany(Likes, {
//         as: "Likes",
//         foreignKey: "postId"
//     });
//     Likes.belongsTo(Posts, {
//         foreignKey: "postId"
//     });
// }