// const bus_routes = require("./bus_routes")
// const classes = require("./classes")
// const classrooms = require("./classrooms")
const currencies = require("./currencies")
const departments = require("./departments")
// const drop_offs = require("./drop_offs")
const enrols = require("./enrols")
const sales = require("./sales")
const expenses = require("./expenses")
const expenses_categories = require("./expenses_categories")
// const frontend_events = require("./frontend_events")
// const frontend_gallery = require("./frontend_gallery")
// const frontend_settings = require("./frontend_settings")
const payment_methods = require("./payment_methods")
const invoices = require("./invoices")
const menus = require("./menus")
const noticeboard = require("./noticeboard")
const personels = require("./personels")
const stock_out_invoices = require("./stock_out_invoices")
const salaries = require("./salaries")
const businesses = require("./businesses")
// const sections = require("./sections")
const sessions = require("./sessions")
const settings = require("./settings")
const smtp_settings = require("./smtp")
const customers = require("./customers")
// const customers_routes = require("./customers_routes")
const item_categories = require("./item_categories")
const items = require("./items")
const employees = require("./employees")
const users = require("./users")
// const vehicles = require("./vehicles");
const employees_permissions = require('./employees_permissions');
// const marks = require("./marks");
// const syllabuses = require("./syllabuses");
const employees_attendances = require("./employees_attendances");
const stores = require("./stores");
// const book_issues = require("./book_issues");
const deductions = require("./deductions")
const deductions_charts = require("./deductions_charts")
const stockIns = require("./stockIns");
const stockOuts = require("./stockOuts");
const transactions = require("./transactions")
const userRoles = require("./user_roles")
const permissions = require("./permissions")
const userRolePermissions = require("./user_role_permissions")
const invoice_stockIns = require("./invoice_stockIns")
const invoice_stockOuts = require("./invoice_stockOuts")
const invoice_transactions = require("./invoice_transactions")
const transaction_authorizers = require("./transaction_authorizers")
const invoice_authorizers = require("./invoice_authorizers")
const authorizers = require("./authorizers")
const stockIn_transactions = require("./stockIn_transactions")
const roles = require("./roles")
const user_role_permissions = require("./user_role_permissions")
const user_roles = require("./user_roles");
const authorizer_access = require("./authorizer_access")


module.exports = {
    roles,
    user_role_permissions,
    user_roles, stockOuts,
    sessions, userRoles, userRolePermissions,
    permissions,
    currencies, stockIns, transactions,
    stockOuts,
    authorizer_access,
    businesses, item_categories, items, users, smtp_settings, settings, personels,
    departments, employees, customers, salaries, stock_out_invoices, stores, invoice_stockIns,
    invoice_stockOuts,
    invoice_transactions,
    transaction_authorizers,
    invoice_authorizers,
    authorizers,
    stockIn_transactions,
    noticeboard, menus, sales, expenses_categories, expenses, deductions, payment_methods, invoices, enrols, employees_permissions, employees_attendances, deductions_charts
};