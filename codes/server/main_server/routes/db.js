const {ConnectionPool} = require('mssql');
require('dotenv').config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    server: process.env.DB_SERVER,
    port :  Number(process.env.DB_PORT),
        options: {
            trustServerCertificate: true,
            encrypte : true,
        },
}

const dbConnection = new ConnectionPool(config)
    .connect()
    .then((pool) => {
        console.log('connection complete');
        return pool;
    })
    .catch((err) => {
        console.log(err);
    })

async function queryDatabase(query, parameters){
    const pool = await dbConnection;
    try{
        const result = await pool.request()
            .input('user_id', parameters.user_id)
            .input('user_id_c', parameters.user_id_c)
            .input('card_id', parameters.card_id)
            .input('pass_word', parameters.pass_word)  // 'Tier'에 대한 입력 추가
            .input('ph_num', parameters.ph_num)  // 'Wins'에 대한 입력 추가
            .input('user_name', parameters.user_name)  // 'Losses'에 대한 입력 추가
            .input('birth_date', parameters.birth_date)
            .input('email', parameters.email)
            .input('service_grade', parameters.service_grade)  // 'WinRate'에 대한 입력 추가
            .query(query);
        return result.recordset;
       
    }
    catch(err){
        console.log(err);

    }
} 



module.exports = queryDatabase;

