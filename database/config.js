module.exports = {

    "HOST": "http://srv-captain--storekeeper-db",

    "USER": "root",

    "PASSWORD": "thina2023",

    "DB": "storekeeper247_db",

    "dialect": "mysql",

    pool: {

        max: 5,

        min: 0,

        acquire: 30000,

        idle: 10000

    }

};