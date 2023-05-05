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
const payment_methods = require("./payment_methods")
const invoices = require("./invoices")
const menus = require("./menus")
const noticeboard = require("./noticeboard")
const personels = require("./personels")
const stock_out_invoices = require("./stock_out_invoices")
const salaries = require("./salaries")
const businesses = require("./businessees/businesses")
const sessions = require("./sessions")
const settings = require("./settings")
const smtp_settings = require("./smtp")
const customers = require("./customers")
const item_categories = require("./item_categories")
const items = require("./items")
const users = require("./users")
const employees_permissions = require('./employees_permissions');
const deductions = require("./deductions")
const deductions_charts = require("./deductions_charts")
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
const store_asset_limits = require("./stores/store_assets_limit")
const store_assets = require("./stores/store_assets")
const store_deductions = require("./businessees/business_deductions")
const stores = require("./stores/stores")
const business_addresses = require("./businessees/business_addresses")
const business_assets = require("./businessees/business_assets")
const business_authorizer_access = require("./businessees/business_authorizer_access ")
const business_bonuses = require("./businessees/business_bonuses")
const business_contacts = require("./businessees/business_contacts")
const business_employees = require("./businessees/business_employees")
const business_employees_attendances = require("./businessees/business_employees_attendances")
const business_invoices = require("./businessees/business_invoice")
const business_menus = require("./businessees/business_menus")
const business_notifications = require("./businessees/business_notifications")
const business_payment_methods = require("./businessees/business_payment_methods");
const store_menus = require('../models/stores/store_menus');
const main_menus = require('../models/main_menus');
const client_businesses = require("./client_businesses")
const client_business_role = require("./client_business_roles");
module.exports = {
    roles,
    main_menus,
    client_businesses,
    client_business_role,
    store_menus,
    business_addresses,
    business_assets,
    business_authorizer_access,
    business_bonuses,
    business_contacts,
    business_employees,
    business_employees_attendances,
    business_invoices,
    business_menus,
    business_notifications,
    business_payment_methods,
    store_asset_limits,
    store_assets,
    store_deductions,
    stores,
    user_role_permissions,
    user_roles, stockOuts,
    sessions, userRoles, userRolePermissions,
    permissions,
    currencies, transactions,
    stockOuts,
    authorizer_access,
    businesses, item_categories, items, users, smtp_settings, settings, personels,
    departments, customers, salaries, stock_out_invoices, invoice_stockIns,
    invoice_stockOuts,
    invoice_transactions,
    transaction_authorizers,
    invoice_authorizers,
    authorizers,
    stockIn_transactions,
    noticeboard, menus, sales, expenses_categories, expenses, deductions, payment_methods, invoices, enrols, employees_permissions, deductions_charts
};