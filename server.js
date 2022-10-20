import env from './config.env.js';
import app from './app.js';
import sequelize from './database/config/connection.js';
import associateModels from './database/config/association.js';


app.listen(env.PORT, async()=>{
    console.log(`SERVER RUNNING ON PORT ${env.PORT}`);
    try {
        await sequelize.authenticate();
        associateModels(sequelize);
        
    } catch (error) {
        console.log(`SERVER FAIL: ${error}`);
        process.exit(0);
    };    
});