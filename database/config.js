module.exports = {

    "HOST": "209.38.238.12",
    "USER": "root",
    "PASSWORD": "thina2023",
    "DB": "storekeeper-db",
    "dialect": "mysql",
    "PORT": 3306,

    pool: {

        max: 5,

        min: 0,

        acquire: 30000,

        idle: 10000

    }

};