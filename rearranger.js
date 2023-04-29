let arrayIndex = [`display_name`, `route_name`, `parent`, `icon`, `superadmin_access`, `admin_access`, `system_manager_access`, `customer_personel_access`, `employee_manager_access`, `employee_accountant_access`, `employee_sales_access`, `employee_marketing_access`, `employee_driver_access`, `employee_security_access`, `employee_semi_skilled_access`, `employee_hr_access`, `sort_order`, `is_addon`, `unique_identifier`];
let arrayList = [
    ['Super-admin', '/superadmin', 0, 'mdi mdi-account-cog', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, null, 0, null],
    ['Dashboard', '#', 0, 'mdi mdi-store', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, null, 0, null],
    ['Management', '#', 0, 'mdi mdi-bookmark-box-multiple-outline', 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, null, 0, null],
    ['CRM', '#', 0, 'mdi mdi-store', 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, null, 0, null],
    ['Accounts', '#', 0, 'mdi mdi-bank', 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, null, 0, null],
    ['Settings', '#', 0, 'mdi mdi-cog', 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, null, 0, null],
    ['Employees', '#', 0, 'mdi mdi-account', 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, null, 0, null],
    ['Stores-Operations', '#', 0, 'mdi mdi-store', 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, null, 0, null],
    ['Currencies', '/currencies', 1, 'mdi mdi-currency-usd', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, null, 0, null],
    ['Businesses', '/businesses', 1, 'mdi mdi-bank', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, null, 0, null],
    ['Admins', '/admin', 1, 'mdi mdi-account-heart', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, null, 0, null],
    ['Home', '/home', 2, 'mdi mdi-home', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, null, 0, null],
    ['Departments', '/departments', 3, 'mdi mdi-graph-outline', 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, null, 0, null],
    ['Categories', '/categories', 3, 'mdi mdi-store', 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, null, 0, null],
    ['Items', '/items', 3, 'mdi mdi-french-fries', 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, null, 0, null],
    ['Stores', '/stores', 3, 'mdi mdi-store', 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, null, 0, null],
    ['Personels', '/personels', 4, 'mdi mdi-account', 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, null, 0, null],
    ['Customers', '/customers', 4, 'mdi mdi-account-tie-outline', 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, null, 0, null],
    ['Stock In', '/stocks/in', 8, 'mdi mdi-storefront-plus', 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, null, 0, null],
    ['Invoices', '/invoices', 5, 'mdi mdi-file-table-box-multiple', 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, null, 0, null],
    ['POS', '/pos', 2, 'mdi mdi-sale', 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, null, 0, null]
];

module.exports = { arrayIndex, arrayList };