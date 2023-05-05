

module.exports = () => {
    return {
        "DB_HOST": process.env.D_DB_HOST || '127.0.0.1',
        "DB_USER": process.env.D_DB_USER || 'root',
        "DB_PASSWORD": process.env.D_DB_PASSWORD || 'thina2023',
        "DB_NAME": process.env.D_DB_NAME || 'storekeeper247_db',
        "DB_PORT": process.env.D_DB_PORT || 3307,
        "dialect": process.env.D_DB_DIALECT || 'mysql',
        pool: {

            max: 5,

            min: 0,

            acquire: 30000,

            idle: 10000

        }

    }
};