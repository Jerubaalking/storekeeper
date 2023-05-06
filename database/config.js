

if (process.env.NODE_ENV == 'development') {

    var host = process.env.D_DB_HOST;
    var user = process.env.D_DB_USER;
    var password = process.env.D_DB_PASSWORD;
    var name = process.env.D_DB_NAME;
    var port = process.env.D_DB_PORT;
    var dialect = process.env.D_DB_DIALECT;
} else {

    var host = process.env.D_DB_HOST;
    var user = process.env.D_DB_USER;
    var password = process.env.D_DB_PASSWORD;
    var name = process.env.D_DB_NAME;
    var port = process.env.D_DB_PORT;
    var dialect = process.env.D_DB_DIALECT;
}

module.exports = () => {

if (process.env.NODE_ENV == 'development') {

    return {
        "DB_HOST": host,
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

    }
} else {
    return {
        "DB_HOST": 'srv-captain--mysql-db',
        "DB_USER": 'root',
        "DB_PASSWORD": 'thina@2023',
        "DB_NAME": 'storekeeper247_db',
        "DB_PORT": '3306',
        "dialect": 'mysql',
        pool: {

            max: 5,

            min: 0,

            acquire: 30000,

            idle: 10000

        }

    }
}
    
};