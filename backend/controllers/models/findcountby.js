const { sessions,
    currencies, stores, stockIns, stockOuts,
    businesses, users, personels, customers, item_categories, items,
    employees, employees_attendances, employees_permissions, smtp_settings, settings,
    departments, deductions, salaries, noticeboard, menus, payment_methods, sales, invoices, sales_invoices, expenses_categories, expenses, enrols,
} = require('../../../database/models/module_exporter');
const { Op } = require('../../../database/mysql');
class FindCountBy {
    constructor(session) {
        this._session = session;
    }
    async stockIns(opt) {
        return JSON.parse(JSON.stringify(await stockIns.findAndCountAll(opt)));
    }
    async stockOuts(opt) {
        return JSON.parse(JSON.stringify(await stockOuts.findAndCountAll(opt)));
    }
    async bookIssue(opt) {
        return JSON.parse(JSON.stringify(await book_issues.findAndCountAll(opt)));
    }
    async teachers_permissions(opt) {
        return JSON.parse(JSON.stringify(await teachers_permissions.findAndCountAll(opt)));
    }
    async book(opt) {
        return JSON.parse(JSON.stringify(await books.findAndCountAll(opt)));
    }
    async subject(opt) {
        return JSON.parse(JSON.stringify(await subjects.findAndCountAll(opt)));
    }
    async bus(opt) {
        return JSON.parse(JSON.stringify(await bus_routes.findAndCountAll(opt)));
    }
    async attendance(opt) {
        opt.where['schoolId'] = this._session.schoolId;
        opt.where['sessionId'] = this._session.sessionId;
        console.log('opt>>>>>>', this._session);
        return JSON.parse(JSON.stringify(await daily_attendances.findAndCountAll(opt)));
    }

    async syllabus(opt) {
        return JSON.parse(JSON.stringify(await syllabuses.findAndCountAll(opt)));
    }
    async mark(opt) {
        return JSON.parse(JSON.stringify(await marks.findAndCountAll(opt)));
    }
    async session(opt) {
        return JSON.parse(JSON.stringify(await sessions.findAndCountAll(opt)));
    }
    async currency(opt) {
        return JSON.parse(JSON.stringify(await currencies.findAndCountAll(opt)));
    }
    async school(opt) {
        return JSON.parse(JSON.stringify(await schools.findAndCountAll(opt)));
    }
    async classroom(opt) {
        return JSON.parse(JSON.stringify(await classrooms.findAndCountAll(opt)));
    }
    async class(opt) {
        return JSON.parse(JSON.stringify(await classes.findAndCountAll(opt)));
    }
    async section(opt) {
        return JSON.parse(JSON.stringify(await sections.findAndCountAll(opt)));
    }
    async user(opt) {
        return JSON.parse(JSON.stringify(await users.findAndCountAll(opt)));
    }
    async smtp_setting(opt) {
        return JSON.parse(JSON.stringify(await smtp_settings.findAndCountAll(opt)));
    }
    async setting(opt) {
        return JSON.parse(JSON.stringify(await settings.findAndCountAll(opt)));
    }
    async parent(opt) {
        return JSON.parse(JSON.stringify(await parents.findAndCountAll(opt)));
    }
    async department(opt) {
        return JSON.parse(JSON.stringify(await departments.findAndCountAll(opt)));
    }
    async teacher(opt) {
        return JSON.parse(JSON.stringify(await teachers.findAndCountAll(opt)));
    }
    async student(opt) {
        return JSON.parse(JSON.stringify(await students.findAndCountAll(opt)));
    }
    async bus_route(opt) {
        return JSON.parse(JSON.stringify(await bus_routes.findAndCountAll(opt)));
    }
    async drop_off(opt) {
        return JSON.parse(JSON.stringify(await drop_offs.findAndCountAll(opt)));
    }
    async students_route(opt) {
        return JSON.parse(JSON.stringify(await students_routes.findAndCountAll(opt)));
    }
    async salarie(opt) {
        return JSON.parse(JSON.stringify(await salaries.findAndCountAll(opt)));
    }
    async routine(opt) {
        return JSON.parse(JSON.stringify(await routines.findAndCountAll(opt)));
    }
    async noticeboard(opt) {
        return JSON.parse(JSON.stringify(await noticeboard.findAndCountAll(opt)));
    }
    async menu(opt) {
        return JSON.parse(JSON.stringify(await menus.findAndCountAll(opt)));
    }

    async sub_menu(opt) {
        return JSON.parse(JSON.stringify(await menus.findAndCountAll(opt)))
    }
    async exam(opt) {
        return JSON.parse(JSON.stringify(await exams.findAndCountAll(opt)));
    }

    async expenses_category(opt) {
        return JSON.parse(JSON.stringify(await expenses_categories.findAndCountAll(opt)));
    }
    async expense(opt) {
        return JSON.parse(JSON.stringify(await expenses.findAndCountAll(opt)))
    }
    async frontend_setting(opt) {
        return JSON.parse(JSON.stringify(await frontend_settings.findAndCountAll(opt)));
    }
    async frontend_gallery(opt) {
        return JSON.parse(JSON.stringify(await frontend_gallery.findAndCountAll(opt)));
    }

    async frontend_event(opt) {
        return JSON.parse(JSON.stringify(await frontend_events.findAndCountAll(opt)));
    }

    async grade(opt) {
        return JSON.parse(JSON.stringify(await grades.findAndCountAll(opt)));
    }

    async invoice(opt) {
        return JSON.parse(JSON.stringify(await invoices.findAndCountAll(opt)))
    }
    async enrol(opt) {
        opt.where['schoolId'] = this._session.schoolId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        console.log('opt>>>>>>', opt);
        return JSON.parse(JSON.stringify(await enrols.findAndCountAll(opt)))
    }
}
module.exports = FindCountBy;
