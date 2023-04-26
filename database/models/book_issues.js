const { Model, DataTpes, sequelize } = require("../mysql");
const books = require("./books");
const classes = require("./classes");
const schools = require("./schools");
const sessions = require("./sessions");
const students = require("./students");
class book_issues extends Model { };
book_issues=sequelize.define({
    id: {
        type: DataTpes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    issue_date: DataTpes.DATE,
    status: {
        type: DataTpes.INTEGER,
        default: 1,
    }
}, {  timestamps: true, paranoid: true });
book_issues.belongsTo(schools);
schools.hasMany(book_issues);
book_issues.belongsTo(sessions);
sessions.hasMany(book_issues);
book_issues.belongsTo(books);
books.hasMany(book_issues);
book_issues.belongsTo(classes);
classes.hasMany(book_issues);
book_issues.belongsTo(students);
students.hasMany(book_issues);
module.exports = book_issues;