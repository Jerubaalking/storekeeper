module.exports = async (app) => {
    app.use('/', require('./backend/routes/home'));
    app.use('/auth', require('./backend/routes/auth'));
    /** SuperADMIN */
    app.use('/businesses', require('./backend/routes/backend/businesses'));
    app.use('/stores', require('./backend/routes/backend/stores'));
    // app.use('/sessions', require('./backend/routes/backend/sessions'));
    // app.use('/settings', require('./backend/routes/backend/settings'));
    app.use('/superadmin', require('./backend/routes/backend/superadmin'));
    app.use('/admin', require('./backend/routes/backend/admin'));
    app.use('/customers', require('./backend/routes/backend/customers'));
    app.use('/personels', require('./backend/routes/backend/personels'));
    // app.use('/sections', require('./backend/routes/backend/sections'));
    app.use('/items', require('./backend/routes/backend/items'));
    app.use('/categories', require('./backend/routes/backend/item_categories'));
    // app.use('/parents', require('./backend/routes/backend/parents'));
    app.use('/stocks/in', require('./backend/routes/backend/stockIns'));
    app.use('/departments', require('./backend/routes/backend/departments'));
    // app.use('/permissions', require('./backend/routes/backend/permissions'));
    // app.use('/accountants', require('./backend/routes/backend/accountants'));
    // app.use('/classes', require('./backend/routes/backend/classes'));
    // app.use('/librarians', require('./backend/routes/backend/librarians'));
    // app.use('/classrooms', require('./backend/routes/backend/classrooms'));
    app.use('/pos', require('./backend/routes/backend/pos'));
    // app.use('/grades', require('./backend/routes/backend/grades'));
    // app.use('/categories', require('./backend/routes/backend/item_categories'));
    // app.use('/marks', require('./backend/routes/backend/marks'));
    // app.use('/vehicles', require('./backend/routes/backend/vehicles'));
    // app.use('/syllabus', require('./backend/routes/backend/syllabuses'));
    // app.use('/attendances', require('./backend/routes/backend/attendances'));
    // app.use('/buses', require('./backend/routes/backend/buses'));
    // app.use('/books', require('./backend/routes/backend/books'));
    // app.use('/profile', require('./backend/routes/backend/profile'));
    // app.use('/deductions', require('./backend/routes/backend/deductions'));
    // app.use('/expenses', require('./backend/routes/backend/expenseCategories'));
    app.use('/invoices', require('./backend/routes/backend/invoices'));
    // app.use('/salaries', require('./backend/routes/backend/salaries'));
    // app.use('/academics', require('./backend/routes/backend/academics'));
}