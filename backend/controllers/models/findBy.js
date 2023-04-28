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
    async vehicle(opt) {

        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await vehicles.findAll(opt)));
    }
    async item(opt) {
        // opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await items.findAndCountAll(opt)));
    }

    async store(opt) {
        opt.where['businessId'] = this._session.businessId;
        // opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await stores.findAll(opt)));
    }
    async role(opt) {
        switch (this._session.businessId) {
            case undefined:
                return JSON.parse(JSON.stringify(await roles.findAll(opt)));
                break;
            default:
                return JSON.parse(JSON.stringify(await roles.findAll(opt)));
        }
        opt.where['businessId'] = this._session.businessId;
        // opt.where['sessionId'] = this._session.sessionId.toString();
    }
    async customer(opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await customers.findAll(opt)));
    }
    async employee(opt) {
        try {
            console.log(await this._session);
            return JSON.parse(JSON.stringify(await employees.findAll(opt)));
        } catch (error) {
            console.log(error);
        }
    }
    async personel(opt) {
        try {
            console.log(await this._session);
            return JSON.parse(JSON.stringify(await personels.findAll(opt)));
        } catch (error) {
            console.log(error);
        }
    }
    async deduction_charts(opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await deductions_charts.findAll(opt)));
    }
    async stockIn(opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await stockIns.findAll(opt)));
    }
    async employees_permissions(opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await employees_permissions.findAll(opt)));
    }
    async stockOut(opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await stockOuts.findAll(opt)));
    }
    async subject(opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await subjects.findAll(opt)));
    }
    async bus(opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await bus_routes.findAll(opt)));
    }
    async attendance(opt) {
        opt.where['businessId'] = this._session.businessId;
        opt.where['sessionId'] = this._session.sessionId;
        console.log('opt>>>>>>', this._session);
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await daily_attendances.findAll(opt)));
    }

    async syllabus(opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await syllabuses.findAll(opt)));
    }
    async mark(opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await marks.findAll(opt)));
    }
    async session(opt) {
        return JSON.parse(JSON.stringify(await sessions.findAll(opt)));
    }
    async currency(opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await currencies.findAll(opt)));
    }
    async business(opt) {
        return JSON.parse(JSON.stringify(await businesses.findAll(opt)));
    }
    async classroom(opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await classrooms.findAll(opt)));
    }
    async item_categories(opt) {
        // opt.where['businessId'] = this._session.businessId.toString();
        return JSON.parse(JSON.stringify(await item_categories.findAll(opt)));
    }
    async section(opt) {
        // opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await sections.findAll(opt)));
    }
    async user(opt) {
        try {
            // opt.where['businessId'] = this._session.businessId.toString();
            console.log(opt);
            opt.where['sessionId'] = this._session.sessionId.toString();
            let user = await users.findAndCountAll(opt);
            return { status: true, data: JSON.parse(JSON.stringify(user.rows)), count: user.count, notification: null }
        } catch (err) {
            return { status: false, data: [], count: 0, notification: 'access denied! Operation unauthorized' }
        }
    }
    async signin(opt) {
        try {
            let userRoles = JSON.parse(JSON.stringify(await user_roles.findAll()));
            opt['include'] = { model: roles };
            var user = JSON.parse(JSON.stringify(await users.findOne(opt)));
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
    async smtp_setting(opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await smtp_settings.findAll(opt)));
    }
    async setting(opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await settings.findAll(opt)));
    }
    async parent(opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await parents.findAll(opt)));
    }
    async department(opt) {
        if (this._session) {
            console.log('session', this._session);
            console.log(await this._session);
            opt.where['businessId'] = (this._session.businessId) ? this._session.businessId.toString() : null;
            // opt.where['sessionId'] = this._session.sessionId.toString();
            return JSON.parse(JSON.stringify(await departments.findAll(opt)));
        }
    }
    async teacher(opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await teachers.findAll(opt)));
    }
    async student(opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await students.findAll(opt)));
    }
    async bus_route(opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await bus_routes.findAll(opt)));
    }
    async drop_off(opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await drop_offs.findAll(opt)));
    }
    async students_route(opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await students_routes.findAll(opt)));
    }
    async salaries(opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await salaries.findAll(opt)));
    }
    async routine(opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await routines.findAll(opt)));
    }
    async noticeboard(opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await noticeboard.findAll(opt)));
    }
    async menu(opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await menus.findAll(opt)));
    }

    async sub_menu(opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await menus.findAll(opt)))
    }
    async exam(opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await exams.findAll(opt)));
    }

    async expenses_category(opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await expenses_categories.findAll(opt)));
    }
    async expense(opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await expenses.findAll(opt)))
    }
    async frontend_setting(opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await frontend_settings.findAll(opt)));
    }
    async frontend_gallery(opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await frontend_gallery.findAll(opt)));
    }

    async frontend_event(opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await frontend_events.findAll(opt)));
    }

    async grade(opt) {
        opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await grades.findAll(opt)));
    }

    async invoice(opt) {
        // opt.where['businessId'] = this._session.businessId.toString();
        opt.where['sessionId'] = this._session.sessionId.toString();
        return JSON.parse(JSON.stringify(await invoices.findAll(opt)))
    }
    async enrol(opt) {
        try {
            opt.where['businessId'] = this._session.businessId.toString();
            opt.where['sessionId'] = this._session.sessionId.toString();
            console.log('opt>>>>>>', opt);
            return JSON.parse(JSON.stringify(await enrols.findAll(opt)));
        } catch (err) {
            return err.message;
        }
    }
}
module.exports = FindBy;
