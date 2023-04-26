const { Sequelize, sequelize, Op } = require('./mysql');
class customeTable {
    constructor(model) {
        this._sequelize = sequelize;
        this.Model = this._sequelize.models;
        this.Op = Op;
    }
    getModel() {
        console.log(this._model);
    }

}
// let t = new Table('school', {
//     name: {
//         type: Sequelize.STRING,
//         unique: true
//     },
//     zip_code: {
//         type: Sequelize.STRING,
//     }
// }, false);
module.exports = customeTable;
