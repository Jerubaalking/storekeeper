const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const name = process.env.DB_NAME;
const port = process.env.DB_PORT;
const dialect = process.env.DB_DIALECT;

module.exports = {
    "DB_HOST": 'srv-captain--mysql-db',
    "DB_USER": user,
    "DB_PASSWORD": password,
    "DB_NAME": name,
    "DB_PORT": port,
    "dialect": dialect,
    pool: {

        max: 5,

        min: 0,

        acquire: 30000,

        idle: 10000

    }

};