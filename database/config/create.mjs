import { createConnection } from "mysql2";
import env from "../../config.env.mjs";


const connection = createConnection({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD
});


(() => {
    console.log(env.DB_HOST);
    connection.query(`SHOW DATABASES LIKE 'test'`, (error, result)=>{
        if (error) {
            console.error(error);
            connection.end();
        }
        // console.log(result);
        if (!result.toString()) {
            connection.query(`CREATE DATABASE IF NOT EXISTS test`)
            console.log("CREATE DB");
        } else {
            connection.query(`DROP DATABASE test`)
            console.log("DROP DB");
            connection.query(`CREATE DATABASE IF NOT EXISTS test`)
            console.log("CREATE DB");
        }
        connection.end();
    });
})();