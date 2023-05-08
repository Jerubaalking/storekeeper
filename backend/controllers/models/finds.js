const { roles,
    main_menus,
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
} = require('../../../database/models/module_exporter');
const { Op } = require('../../../database/mysql');
const { spawnJwtPayload } = require('../services/handlers');
class Finds {
    constructor(session) {
        this._session = session;
    }

    async stores() {
        if (this._session.role != 'superadmin') {
            if (this._session.businessId, this._session.sessionId) {
                return JSON.parse(JSON.stringify(await stores.findAll({ where: { businessId: this._session.businessId } })));
            } else {
                return new Error('denied! - user is not authenticated!');
            }
        } else {
            return JSON.parse(JSON.stringify(await stores.findAll()));
        }

    }
    async item_categories() {
        if (this._session.businessId, this._session.sessionId) {
            return JSON.parse(JSON.stringify(await item_categories.findAll()));
        } else {
            return new Error('denied! - user is not authenticated!');
        }
    }
    async stockIns() {
        if (this._session.businessId, this._session.sessionId) {
            return JSON.parse(JSON.stringify(await stockIns.findAll({ where: { businessId: this._session.businessId } })));
        } else {
            return new Error('denied! - user is not authenticated!');
        }
    } async customers() {
        console.log(this._session);
        if (this._session, this._session.sessionId) {
            if (this._session.businessId) {
                return JSON.parse(JSON.stringify(await customers.findAndCountAll({ where: { businessId: this._session.businessId } })));
            } else {
                return JSON.parse(JSON.stringify(await customers.findAndCountAll()));
            }
        } else {
            return new Error('denied! - user is not authenticated!');
        }
    }
    async staff() {
        if (this._session.businessId, this._session.sessionId) {
            return JSON.parse(JSON.stringify(await users.findAndCountAll()));
        } else {
            return new Error('denied! - user is not authenticated!');
        }
    }
    async stockOuts() {
        if (this._session.businessId, this._session.sessionId) {
            return JSON.parse(JSON.stringify(await stockOuts.findAll({ where: { businessId: this._session.businessId } })));
        } else {
            return new Error('denied! - user is not authenticated!');
        }
    }
    async subjects() {
        if (this._session.businessId, this._session.sessionId) {
            return JSON.parse(JSON.stringify(await subjects.findAll({ where: { businessId: this._session.businessId } })));
        } else {
            return new Error('denied! - user is not authenticated!');
        }
    }
    async deductions() {
        if (this._session.businessId, this._session.sessionId) {
            let ses = await this._session;
            let ded = await deductions.findAll({ where: { businessId: await ses.businessId } });
            return JSON.parse(JSON.stringify(ded));
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async vehiclesOpt() {
        if (this._session.businessId, this._session.sessionId) {
            return JSON.parse(JSON.stringify(await vehicles.findAll(opt)));
        } else {
            return new Error('denied! - user is not authenticated!');
        }
    }
    async sessions() {
        if (this._session.businessId, this._session.sessionId) {
            return JSON.parse(JSON.stringify(await sessions.findAll()));
        } else {
            return new Error('denied! - user is not authenticated!');
        }
    }
    async librarians() {
        if (this._session.businessId, this._session.sessionId) {
            return JSON.parse(JSON.stringify(await users.findAll({ where: { role: 'librarian' } })));
        } else {
            return new Error('denied! - user is not authenticated!');
        }
    }
    async currencies() {
        if (this._session.businessId, this._session.sessionId) {
            return JSON.parse(JSON.stringify(await currencies.findAll()));
        } else {
            return new Error('denied! - user is not authenticated!');
        }
    }
    async businesses() {
        if (this._session.businessId, this._session.sessionId) {
            return JSON.parse(JSON.stringify(await businesses.findAll()));
        } else {
            return new Error('denied! - user is not authenticated!');
        }
    }

    async _businesses() {
        // if (this._session.businessId, this._session.sessionId) {
        return JSON.parse(JSON.stringify(await businesses.findAll()));
        // } else {
        //     return new Error('denied! - user is not authenticated!');
        // }
    }
    async classrooms() {
        if (this._session.businessId, this._session.sessionId) {
            return JSON.parse(JSON.stringify(await classrooms.findAll({ where: { businessId: this._session.businessId } })));
        } else {
            return new Error('denied! - user is not authenticated!');
        }
    }
    async teacher_permissions(teacherId) {
        if (this._session.businessId, this._session.sessionId) {
            return JSON.parse(JSON.stringify(await teachers_permissions.findAll({ where: { teacherId: teacherId }, include: [{ model: teachers, include: { model: users } }, { model: classes }, { model: sections }] })));
        } else {
            return new Error('denied! - user is not authenticated!');
        }
    }
    async classes() {
        if (this._session.businessId, this._session.sessionId) {
            return JSON.parse(JSON.stringify(await classes.findAll({ where: { businessId: this._session.businessId } })));
        } else {
            return new Error('denied! - user is not authenticated!');
        }
    }
    async sections() {
        if (this._session.businessId, this._session.sessionId) {
            return JSON.parse(JSON.stringify(await sections.findAll()));
        } else {
            return new Error('denied! - user is not authenticated!');
        }
    }
    async users() {
        if (this._session.businessId, this._session.sessionId) {
            return JSON.parse(JSON.stringify(await users.findAll({ where: { businessId: this._session.businessId } })));
        } else {
            return new Error('denied! - user is not authenticated!');
        }
    }
    async smtp_settings() {
        if (this._session.businessId, this._session.sessionId) {
            return JSON.parse(JSON.stringify(await smtp_settings.findOne()));
        } else {
            return new Error('denied! - user is not authenticated!');
        }
    }
    async settings() {
        if (this._session.businessId, this._session.sessionId) {
            return JSON.parse(JSON.stringify(await settings.findOne()));
        } else {
            return new Error('denied! - user is not authenticated!');
        }
    }
    async personels() {
        if (this._session.businessId, this._session.sessionId) {
            return JSON.parse(JSON.stringify(await personels.findAll({ where: { businessId: this._session.businessId }, include: { model: users, nested: false } })));
        } else {
            return new Error('denied! - user is not authenticated!');
        }
    }
    async departments() {
        if (this._session.businessId, this._session.sessionId) {
            return JSON.parse(JSON.stringify(await departments.findAll({ where: { businessId: this._session.businessId } })));
        } else {
            return new Error('denied! - user is not authenticated!');
        }
    }
    async teachers() {
        if (this._session.businessId, this._session.sessionId) {
            return JSON.parse(JSON.stringify(await teachers.findAll({ where: { businessId: this._session.businessId }, include: [{ model: users }] })));
        } else {
            return new Error('denied! - user is not authenticated!');
        }
    }
    async students() {
        if (this._session.businessId, this._session.sessionId) {
            return JSON.parse(JSON.stringify(await students.findAll({ where: { businessId: this._session.businessId } })));
        } else {
            return new Error('denied! - user is not authenticated!');
        }
    }
    async bus_routes() {
        if (this._session.businessId, this._session.sessionId) {
            return JSON.parse(JSON.stringify(await bus_routes.findAll({ where: { businessId: this._session.businessId } })));
        } else {
            return new Error('denied! - user is not authenticated!');
        }
    }
    async drop_offs() {
        if (this._session.businessId, this._session.sessionId) {
            return JSON.parse(JSON.stringify(await drop_offs.findAll({ where: { businessId: this._session.businessId } })));
        } else {
            return new Error('denied! - user is not authenticated!');
        }
    }
    async students_routes() {
        if (this._session.businessId, this._session.sessionId) {
            return JSON.parse(JSON.stringify(await students_routes.findAll({ where: { businessId: this._session.businessId } })));
        } else {
            return new Error('denied! - user is not authenticated!');
        }
    }
    async salaries() {
        if (this._session.businessId, this._session.sessionId) {
            return JSON.parse(JSON.stringify(await salaries.findAll({ where: { businessId: this._session.businessId } })));
        } else {
            return new Error('denied! - user is not authenticated!');
        }
    }
    async routines() {
        if (this._session.businessId, this._session.sessionId) {
            return JSON.parse(JSON.stringify(await routines.findAll({ where: { businessId: this._session.businessId } })));
        } else {
            return new Error('denied! - user is not authenticated!');
        }
    }
    async noticeboard() {
        if (this._session.businessId, this._session.sessionId) {
            return JSON.parse(JSON.stringify(await noticeboard.findAll({ where: { businessId: this._session.businessId } })));
        } else {
            return new Error('denied! - user is not authenticated!');
        }
    }
    async menus() {
        // if (this._session.passport, this._session.sessionId) {
        return JSON.parse(JSON.stringify(await menus.findAll()));
        // } else {
        //     return new Error('denied! - user is not authenticated!');
        // }
    }
    async main_menus() {
        if (this._session.businessId, this._session.sessionId) {
            return JSON.parse(JSON.stringify(await menus.findAll({ where: { parent: 0 } })));
        } else {
            return new Error('denied! - user is not authenticated!');
        }
    }

    async sub_menus() {
        // if (this._session.businessId, this._session.sessionId) {
        return JSON.parse(JSON.stringify(await menus.findAll({ where: { [Op.not]: { parent: 0 } } })));
        // } else {
        // return new Error('denied! - user is not authenticated!');
        // }
    }
    async exams() {
        if (this._session.businessId, this._session.sessionId) {
            return JSON.parse(JSON.stringify(await exams.findAll({ where: { businessId: this._session.businessId } })));
        } else {
            return new Error('denied! - user is not authenticated!');
        }
    }

    async expenses_categories() {
        if (this._session.businessId, this._session.sessionId) {
            return JSON.parse(JSON.stringify(await expenses_categories.findAll({ where: { businessId: this._session.businessId } })));
        } else {
            return new Error('denied! - user is not authenticated!');
        }
    }
    async expenses() {
        if (this._session.businessId, this._session.sessionId) {
            return JSON.parse(JSON.stringify(await expenses.findAll({ where: { businessId: this._session.businessId }, include: { model: expenses_categories, nested: false } })));
        } else {
            return new Error('denied! - user is not authenticated!');
        }
    }
    async frontend_settings() {
        if (this._session.businessId, this._session.sessionId) {
            return JSON.parse(JSON.stringify(await frontend_settings.findAll({ where: { businessId: this._session.businessId } })));
        } else {
            return new Error('denied! - user is not authenticated!');
        }
    }
    async frontend_gallery() {
        if (this._session.businessId, this._session.sessionId) {
            return JSON.parse(JSON.stringify(await frontend_gallery.findAll({ where: { businessId: this._session.businessId } })));
        } else {
            return new Error('denied! - user is not authenticated!');
        }
    }

    async frontend_events() {
        if (this._session.businessId, this._session.sessionId) {
            return JSON.parse(JSON.stringify(await frontend_events.findAll({ where: { businessId: this._session.businessId } })));
        } else {
            return new Error('denied! - user is not authenticated!');
        }
    }

    async grades() {
        if (this._session.businessId, this._session.sessionId) {
            return JSON.parse(JSON.stringify(await grades.findAll({ where: { businessId: this._session.businessId } })));
        } else {
            return new Error('denied! - user is not authenticated!');
        }
    }

    async invoices() {
        if (this._session.businessId, this._session.sessionId) {
            return JSON.parse(JSON.stringify(await invoices.findAll({ include: [{ model: stockOuts }, { model: customers }] })));
        } else {
            return new Error('denied! - user is not authenticated!');
        }
    }
}
module.exports = Finds;
