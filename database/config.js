module.exports = {
    "DB_HOST": "127.0.0.1",
    "DB_USER": "root",
    "DB_PASSWORD": "thina2023",
    "DB_HOST2":"172.17.0.1",
    "DB_NAME": "storekeeper247_db",
    "DB_PORT": 3307,
    "dialect": "mysql",
    pool: {

        max: 5,

        min: 0,

        acquire: 30000,

        idle: 10000

    }

};