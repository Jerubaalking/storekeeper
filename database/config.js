module.exports = {
    "DB_HOST": "srv-captain--mysql-db",
    "DB_USER": "root",
    "DB_PASSWORD": "thina2023",
    "DB_HOST2": "srv-captain--mysql-db",
    "DB_NAME": "storekeeper247_db",
    "DB_PORT": 3306,
    "dialect": "mysql",
    pool: {

        max: 5,

        min: 0,

        acquire: 30000,

        idle: 10000

    }

};