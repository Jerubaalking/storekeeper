

module.exports = () => {
    return {
        "DB_HOST": process.env.D_DB_HOST,
        "DB_USER": process.env.D_DB_USER,
        "DB_PASSWORD": process.env.D_DB_PASSWORD,
        "DB_NAME": process.env.D_DB_NAME,
        "DB_PORT": process.env.D_DB_PORT ,
        "dialect": process.env.D_DB_DIALECT,
        pool: {

            max: 5,

            min: 0,

            acquire: 30000,

            idle: 10000

        }

    }
};