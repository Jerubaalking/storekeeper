const {
    sessions,
    currencies, stockIns, stockOuts,
    businesses, users, personels, customers, item_categories, items, stores,
    employees, employees_attendances, employees_permissions, smtp_settings, settings,
    departments, deductions, salaries, noticeboard, menus, payment_methods, sales, invoices, sales_invoices, expenses_categories, expenses, enrols,
} = require('../../../database/models/module_exporter');
const { Op } = require('../../../database/mysql');
class Single {
    constructor(session) {
        this._session = session;
    }
    async store(id) {
        return JSON.parse(JSON.stringify(await stores.findOne({ where: { id: id, businessId: this._session.businessId } })));
    }
    async business(id) {
        try {
            return JSON.parse(JSON.stringify(await businesses.findOne({ where: { id: id } })));
        } catch (err) {
            console.log(err);
        }
    }

    async item(id) {
        try {
            return JSON.parse(JSON.stringify(await items.findOne({ where: { id: id }, include: { model: item_categories } })));
        } catch (err) {
            console.log(err);
        }
    }
    async item_category(id) {
        try {
            return JSON.parse(JSON.stringify(await item_categories.findOne({ where: { id: id } })));
        } catch (err) {
            console.log(err);
        }
    }

    async deduction(id) {
        return JSON.parse(JSON.stringify(await deductions.findOne({ where: { id: id, businessId: this._session.businessId, sessionId: this._session.sessionId } })));
    }
    async bus(id) {
        return JSON.parse(JSON.stringify(await bus_routes.findOne({ where: { id: id, businessId: this._session.businessId, sessionId: this._session.sessionId } })));
    }
    async userOpt(opt) {
        return JSON.parse(JSON.stringify(await users.findOne(opt)))
    }
    async book(id) {
        return JSON.parse(JSON.stringify(await books.findOne({ where: { id: id, businessId: this._session.businessId, sessionId: this._session.sessionId } })));
    }

    async bookIssue(id) {
        return JSON.parse(JSON.stringify(await book_issues.findOne({ where: { id: id, businessId: this._session.businessId, sessionId: this._session.sessionId } })));
    }
    async session(id) {
        return JSON.parse(JSON.stringify(await sessions.findOne({ where: { id: id, businessId: this._session.businessId, sessionId: this._session.sessionId } })));
    }
    async attendance(id) {
        return JSON.parse(JSON.stringify(await daily_attendances.findOne({ where: { id: id, businessId: this._session.businessId, sessionId: this._session.sessionId } })));
    }
    async attendances(opt) {
        return JSON.parse(JSON.stringify(await daily_attendances.findOne(opt)))
    }
    async item_categories(opt) {
        return JSON.parse(JSON.stringify(await item_categories.findOne(opt)))
    }

    async subject(id) {
        return JSON.parse(JSON.stringify(await subjects.findOne({ where: { id: id, businessId: this._session.businessId, sessionId: this._session.sessionId } })));
    }
    async teacher_permissions(opt) {
        return JSON.parse(JSON.stringify(await teachers_permissions.findOne(opt)));
    }
    async currency(id) {
        return JSON.parse(JSON.stringify(await currencies.findOne({ where: { id: id, businessId: this._session.businessId, sessionId: this._session.sessionId } })));
    }
    async school(id) {
        return JSON.parse(JSON.stringify(await schools.findOne({ where: { id: id, businessId: this._session.businessId } })));
    }
    async classroom(id) {
        return JSON.parse(JSON.stringify(await classrooms.findOne({ where: { id: id, businessId: this._session.businessId } })));
    }
    async class(id) {
        return JSON.parse(JSON.stringify(await classes.findOne({ where: { id: id, businessId: this._session.businessId } })));
    }
    async section(id) {
        return JSON.parse(JSON.stringify(await sections.findOne({ where: { id: id } })));
    }
    async user(id) {
        return JSON.parse(JSON.stringify(await users.findOne({ where: { id: id } })));
    }
    async smtp_setting(opt) {
        return JSON.parse(JSON.stringify(await smtp_settings.findOne(opt)))
    }
    async setting(id) {
        return JSON.parse(JSON.stringify(await settings.findOne({ where: { id: id, businessId: this._session.businessId, sessionId: this._session.sessionId } })));
    }
    async parent(id) {
        return JSON.parse(JSON.stringify(await parents.findOne({ where: { id: id, businessId: this._session.businessId }, include: users })));
    }
    async department(id) {
        return JSON.parse(JSON.stringify(await departments.findOne({ where: { id: id, businessId: this._session.businessId } })));
    }
    async teacher(id) {
        let teacher = await teachers.findOne({ where: { id: id, businessId: this._session.businessId, sessionId: this._session.sessionId }, include: users });
        teacher = JSON.parse(JSON.stringify(teacher));
        (teacher.social_link) ? teacher.social_link : teacher.social_link = ['', '', ''];
        teacher['facebook_link'] = JSON.parse(await teacher.social_link)[0];
        teacher['twitter_link'] = JSON.parse(await teacher.social_link)[1];
        teacher['linkedin_link'] = JSON.parse(await teacher.social_link)[2];
        return await teacher;
    }
    async customer(id) {
        return JSON.parse(JSON.stringify(await customers.findOne({ where: { id: id }, include: { model: stores } })));
    }
    async enrols(id) {
        return JSON.parse(JSON.stringify(await enrols.findOne({ where: { id: id, businessId: (this._session.businessId) ? this._session.businessId : 1, sessionId: this._session.sessionId }, include: [{ model: customers, include: { model: stores } }, { model: personels, include: users }] })))
    }
    async bus_route(id) {
        return JSON.parse(JSON.stringify(await bus_routes.findOne({ where: { id: id, businessId: (this._session.businessId) ? this._session.businessId : 1, sessionId: this._session.sessionId } })));
    }
    async drop_off(id) {
        return JSON.parse(JSON.stringify(await drop_offs.findOne({ where: { id: id, businessId: (this._session.businessId) ? this._session.businessId : 1, sessionId: this._session.sessionId } })));
    }
    async students_route(id) {
        return JSON.parse(JSON.stringify(await students_routes.findOne({ where: { id: id, businessId: (this._session.businessId) ? this._session.businessId : 1, sessionId: this._session.sessionId } })));
    }
    async salary(id) {
        return JSON.parse(JSON.stringify(await salaries.findOne({ where: { id: id, businessId: (this._session.businessId) ? this._session.businessId : 1 } })));
    }
    async routine(id) {
        return JSON.parse(JSON.stringify(await routines.findOne({ where: { id: id, businessId: this._session.businessId, sessionId: this._session.sessionId } })));
    }
    async noticeboard(id) {
        return JSON.parse(JSON.stringify(await noticeboard.findOne({ where: { id: id, businessId: this._session.businessId, sessionId: this._session.sessionId } })));
    }
    async menu(id) {
        return JSON.parse(JSON.stringify(await menus.findOne()))
    }
    async main_menu(id) {
        return JSON.parse(JSON.stringify(await menus.findOne({ where: { parent: 0 } })));
    }

    async sub_menu(id) {
        return JSON.parse(JSON.stringify(await menus.findOne({ where: { [Op.not]: { parent: 0 } } })));
    }
    async exam(id) {
        return JSON.parse(JSON.stringify(await exams.findOne({ where: { id: id, businessId: this._session.businessId, sessionId: this._session.sessionId } })));
    }

    async expenses_category(id) {
        return JSON.parse(JSON.stringify(await expenses_categories.findOne({ where: { id: id, businessId: this._session.businessId, sessionId: this._session.sessionId } })));
    }
    async expense(id) {
        return JSON.parse(JSON.stringify(await expenses.findOne({ where: { id: id, businessId: this._session.businessId, sessionId: this._session.sessionId }, include: { model: expenses_categories, nested: false } })));
    }
    async frontend_setting(id) {
        return JSON.parse(JSON.stringify(await frontend_settings.findOne({ where: { id: id, businessId: this._session.businessId, sessionId: this._session.sessionId } })));
    }
    async frontend_gallery(id) {
        return JSON.parse(JSON.stringify(await frontend_gallery.findOne({ where: { id: id, businessId: this._session.businessId, sessionId: this._session.sessionId } })));
    }

    async frontend_event(id) {
        return JSON.parse(JSON.stringify(await frontend_events.findOne({ where: { id: id, businessId: this._session.businessId, sessionId: this._session.sessionId } })));
    }

    async grade(id) {
        return JSON.parse(JSON.stringify(await grades.findOne({ where: { id: id, businessId: this._session.businessId, sessionId: this._session.sessionId } })));
    }

    async invoice(id) {
        return JSON.parse(JSON.stringify(await invoices.findOne({ where: { id: id, businessId: this._session.businessId, sessionId: this._session.sessionId }, include: [{ model: sessions, nested: false }, { model: classes, nested: false }, { model: students, include: [users, { model: parents, include: { model: users } }] }] })))
    }
}
module.exports = Single;
