module.exports = {
    "DB_HOST": "srv-captain--database-db",
    "DB_USER": "root",
    "DB_PASSWORD": "thina2023",
    "DB_NAME": "storekeeper_db",
    "DB_PORT": 3306,
    "dialect": "mysql",
    pool: {

        max: 5,

        min: 2,

        acquire: 30000,

        idle: 10000

    }

};