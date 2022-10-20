import dotenv from "dotenv";

dotenv.config();

process.env.NODE_ENV 


class DBConnection {
    constructor() {
        this.set()
    }
    set() {
        this.MODE = ( process.env.NODE_ENV ) ?
            ( process.env.NODE_ENV ).trim().toLowerCase() : 'development';

        switch (this.MODE) {
            case 'development':
                this.DB_NAME = process.env.DB_NAME;
                this.DB_USER = process.env.DB_USER;
                this.DB_PASSWORD = process.env.DB_PASSWORD;
                this.DB_HOST = process.env.DB_HOST;
                break;
        
            case 'local':
                this.DB_NAME = process.env.LOCAL_NAME;
                this.DB_USER = process.env.LOCAL_USER;
                this.DB_PASSWORD = process.env.LOCAL_PASSWORD;
                this.DB_HOST = process.env.LOCAL_HOST;
                break;
        
            case 'test':
                this.DB_NAME = process.env.TEST_NAME;
                this.DB_USER = process.env.TEST_USER;
                this.DB_PASSWORD = process.env.TEST_PASSWORD;
                this.DB_HOST = process.env.TEST_HOST;
                break;
        }
    }
}


class Env extends DBConnection {
    constructor() {
        super();
        this.PORT = process.env.PORT;
        this.SESSION_KEY = process.env.SESSION_KEY;
        this.JWT_KEY = process.env.JWT_KEY;
        this.SALT_ROUND = Number(process.env.SALT_ROUND);
    }
}

export default new Env();