const {
    sessions,
    currencies, stores, stockIns, stockOuts,
    businesses, users, personels, customers, item_categories, items,
    employees, employees_attendances, employees_permissions, smtp_settings, settings,
    departments, deductions, salaries, noticeboard, menus, payment_methods, sales, invoices, sales_invoices, expenses_categories, expenses, enrols, permissions,
} = require('../../../database/models/module_exporter');
const roles = require('../../../database/models/roles');
const user_roles = require('../../../database/models/user_roles');
const user_role_permissions = require('../../../database/models/user_role_permissions');
const { Op } = require('../../../database/mysql');
class FindBy {
    constructor(session) {
        this._session = session;
        if (this._session) {
            console.log('session', this._session);
        }
    }
    async vehicle(field, opt) {

        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await vehicles.sum(field, opt)));
    }
    async item(field, opt) {
        // opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await items.findAndCountAll(field, opt)));
    }

    async store(field, opt) {
        opt.where['businessId'] = this._session.businessId;
        // opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await stores.sum(field, opt)));
    }
    async customer(field, opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await customers.sum(field, opt)));
    }
    async employee(field, opt) {
        try {
            console.log(await this._session);
            return JSON.parse(JSON.stringify(await employees.sum(field, opt)));
        } catch (error) {
            console.log(error);
        }
    }
    async personel(field, opt) {
        try {
            console.log(await this._session);
            return JSON.parse(JSON.stringify(await personels.sum(field, opt)));
        } catch (error) {
            console.log(error);
        }
    }
    async deduction_charts(field, opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await deductions_charts.sum(field, opt)));
    }
    async stockIn(field, opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await stockIns.sum(field, opt)));
    }
    async employees_permissions(field, opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await employees_permissions.sum(field, opt)));
    }
    async stockOut(field, opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await stockOuts.sum(field, opt)));
    }
    async subject(field, opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await subjects.sum(field, opt)));
    }
    async bus(field, opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await bus_routes.sum(field, opt)));
    }
    async attendance(field, opt) {
        opt.where['businessId'] = this._session.businessId;
        opt.where['sessionId'] = this._session.sessionId;
        console.log('opt>>>>>>', this._session);
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await daily_attendances.sum(field, opt)));
    }

    async syllabus(field, opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await syllabuses.sum(field, opt)));
    }
    async mark(field, opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await marks.sum(field, opt)));
    }
    async session(field, opt) {
        return JSON.parse(JSON.stringify(await sessions.sum(field, opt)));
    }
    async currency(field, opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await currencies.sum(field, opt)));
    }
    async business(field, opt) {
        return JSON.parse(JSON.stringify(await businesses.sum(field, opt)));
    }
    async classroom(field, opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await classrooms.sum(field, opt)));
    }
    async item_categories(field, opt) {
        // opt.where['businessId'] = this._session.businessId.toString();
        return JSON.parse(JSON.stringify(await item_categories.sum(field, opt)));
    }
    async section(field, opt) {
        // opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await sections.sum(field, opt)));
    }
    async user(field, opt) {
        try {
            // opt.where['businessId'] = this._session.businessId.toString();
            console.log(field, opt);
            opt.where['sessionId'] = this._session.sessionId.toString();
            let user = await users.findAndCountAll(field, opt);
            return { status: true, data: JSON.parse(JSON.stringify(user.rows)), count: user.count, notification: null }
        } catch (err) {
            return { status: false, data: [], count: 0, notification: 'access denied! Operation unauthorized' }
        }
    }
    async signin(field, opt) {
        try {
            let userRoles = JSON.parse(JSON.stringify(await user_roles.sum()));
            opt['include'] = { model: roles };
            var user = JSON.parse(JSON.stringify(await users.findOne(field, opt)));
            // console.log('userroles>>>>', userRoles, user);
            for (const userRole of userRoles) {
                for (const role of user.roles) {
                    if (userRole.userId == user.id && userRole.roleId == role.id) {
                        user['role'] = JSON.parse(JSON.stringify(await roles.findOne({ where: { id: role.id }, include: { model: permissions } })));
                        user['business'] = JSON.parse(JSON.stringify(await businesses.findOne({ where: { id: userRole.businessId } })));
                    }
                }
            }
            return await user;
        } catch (err) {
            return new Error(err);
        }
    }
    async smtp_setting(field, opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await smtp_settings.sum(field, opt)));
    }
    async setting(field, opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await settings.sum(field, opt)));
    }
    async parent(field, opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await parents.sum(field, opt)));
    }
    async department(field, opt) {
        if (this._session) {
            console.log('session', this._session);
            console.log(await this._session);
            opt.where['businessId'] = this._session.businessId.toString();
            // opt.where['sessionId'] = this._session.sessionId.toString();
            return JSON.parse(JSON.stringify(await departments.sum(field, opt)));
        }
    }
    async teacher(field, opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await teachers.sum(field, opt)));
    }
    async student(field, opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await students.sum(field, opt)));
    }
    async bus_route(field, opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await bus_routes.sum(field, opt)));
    }
    async drop_off(field, opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await drop_offs.sum(field, opt)));
    }
    async students_route(field, opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await students_routes.sum(field, opt)));
    }
    async salaries(field, opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await salaries.sum(field, opt)));
    }
    async routine(field, opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await routines.sum(field, opt)));
    }
    async noticeboard(field, opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await noticeboard.sum(field, opt)));
    }
    async menu(field, opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await menus.sum(field, opt)));
    }

    async sub_menu(field, opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await menus.sum(field, opt)))
    }
    async exam(field, opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await exams.sum(field, opt)));
    }

    async expenses_category(field, opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await expenses_categories.sum(field, opt)));
    }
    async expense(field, opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await expenses.sum(field, opt)))
    }
    async frontend_setting(field, opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await frontend_settings.sum(field, opt)));
    }
    async frontend_gallery(field, opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await frontend_gallery.sum(field, opt)));
    }

    async frontend_event(field, opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await frontend_events.sum(field, opt)));
    }

    async grade(field, opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await grades.sum(field, opt)));
    }

    async invoice(field, opt) {
        // opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await invoices.sum(field, opt)))
    }
    async enrol(field, opt) {
        try {
            opt.where['businessId'] = this._session.businessId.toString();
            opt.where['sessionId'] = this._session.sessionId.toString();
            console.log('opt>>>>>>', opt);
            return JSON.parse(JSON.stringify(await enrols.sum(field, opt)));
        } catch (err) {
            return err.message;
        }
    }
}
module.exports = FindBy;
