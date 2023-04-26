const { Model, DataTpes, sequelize } = require("../mysql");

const schools = require("./schools");
const sessions = require("./sessions");
class books extends Model { };
books=sequelize.define({
    id: {
        type: DataTpes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: DataTpes.STRING,
    author: DataTpes.STRING,
    copies: DataTpes.STRING,
    isbn: DataTpes.STRING
}, {  timestamps: true, paranoid: true });
books.belongsTo(schools);
schools.hasMany(books);
books.belongsTo(sessions);
sessions.hasMany(books);
module.exports = books;