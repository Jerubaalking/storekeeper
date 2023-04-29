process.env.NODE_ENV = 'production';
module.exports = {
    "DB_HOST": process.env.DB_HOST,
    "DB_USER": process.env.DB_USER,
    "DB_PASSWORD": process.env.DB_PASSWORD,
    "DB_NAME": process.env.DB_NAME,
    "DB_PORT": process.env.DB_PORT,
    "dialect": "mysql",
    pool: {

        max: 5,

        min: 0,

        acquire: 30000,

        idle: 10000

    }

};