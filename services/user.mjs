import UserRepository from "../database/repositories/user.mjs";


export default class UserService {
    User = new UserRepository();

    findNickname = async(nickname) => {
        const result = await this.User.findOne(nickname);
        
        if (result === null) return null;
        
        return { 
            userId: result.get().userId, 
            nickname: result.get().nickname,
            password: result.get().password
        };
    }

    signupUser = async(user) => {
        try {
            const result = await this.User.createOne(user);

            return {
                user: result.get(),
                isNewRecord: result._options.isNewRecord,
            }
            
        } catch (error) {
            if (error.parent.code === "ER_DUP_ENTRY") {
                return { user: {}, isNewRecord: false }
            };
            return error;
        }
    }
}