module.exports = {

    "HOST": "http://storekeeper-db.saincrafttechnologies.com",
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