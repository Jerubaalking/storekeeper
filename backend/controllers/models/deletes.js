const countries = require('../../../database/models/countries');
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
const { spawnJwtPayload } = require('../services/handlers');
const { passwordHash, generateUniqueIdentifier } = require('../services/service');

class deletes {
    constructor(session) {
        this._instance = session;
    }
    async vehicle(id) {
        if (this._instance.schoolId, this._instance.sessionId) {
            return await vehicles.destroy({ where: { id: id } })
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async bookIssue(id) {
        if (this._instance.schoolId, this._instance.sessionId) {
            return await book_issues.destroy({ where: { id: id } })
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async syllabus(id) {
        if (this._instance.schoolId, this._instance.sessionId) {
            return await syllabuses.destroy({ where: { id: id } })
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async session(id) {
        if (this._instance.schoolId, this._instance.sessionId) {
            return await sessions.destroy({ where: { id: id } })
        } else {
            throw new Error('user not authenticated!');
        }
    }

    async subject(id) {
        if (this._instance.schoolId, this._instance.sessionId) {
            return await subjects.destroy({ where: { id: id } })
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async teacher_permissions(opt) {
        if (this._instance.schoolId, this._instance.sessionId) {
            return await teachers_permissions.destroy(opt)
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async currency(id) {
        if (this._instance.schoolId, this._instance.sessionId) {
            return await currencies.destroy({ where: { id: id } })
        } else {
            throw new Error('user not authenticated!');
        }
    }  async country(id) {
        if (this._instance.schoolId, this._instance.sessionId) {
            return await countries.destroy({ where: { id: id } })
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async school(id) {
        if (this._instance.schoolId, this._instance.sessionId) {
            return await schools.destroy({ where: { id: id } })
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async classroom(id) {
        if (this._instance.schoolId, this._instance.sessionId) {
            return await classrooms.destroy({ where: { id: id } })
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async class(id) {
        if (this._instance.schoolId, this._instance.sessionId) {
            return await classes.destroy({ where: { id: id } })
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async section(id) {
        if (this._instance.schoolId, this._instance.sessionId) {
            return await sections.destroy({ where: { id: id } })
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async user(id) {
        if (this._instance.schoolId, this._instance.sessionId) {
            return await users.destroy({ where: { id: id } })
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async smtp_setting(id) {
        if (this._instance.schoolId, this._instance.sessionId) {
            return await smtp_settings.destroy({ where: { id: id } })
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async setting(id) {
        if (this._instance.schoolId, this._instance.sessionId) {
            return await settings.destroy({ where: { id: id } })
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async parent(id) {
        if (this._instance.schoolId, this._instance.sessionId) {
            return await parents.destroy({ where: { id: id }, include: users })
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async department(id) {
        if (this._instance.schoolId, this._instance.sessionId) {
            return await departments.destroy({ where: { id: id } })
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async teacher(id) {
        if (this._instance.schoolId, this._instance.sessionId) {
            let teacher = await teachers.destroy({ where: { id: id }, include: users });
            teacher = JSON.parse(JSON.stringify(await teacher));
            (teacher.social_link) ? teacher.social_link : teacher.social_link = ['', '', ''];
            teacher['facebook_link'] = JSON.parse(await teacher.social_link)[0];
            teacher['twitter_link'] = JSON.parse(await teacher.social_link)[1];
            teacher['linkedin_link'] = JSON.parse(await teacher.social_link)[2];
            return await teacher;
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async student(id) {
        if (this._instance.schoolId, this._instance.sessionId) {
            return await students.destroy({ where: { id: id }, include: [{ model: users }] })
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async enrols(id) {
        if (this._instance.schoolId, this._instance.sessionId) {
            return await enrols.destroy({ where: { id: id }, include: [{ model: students, include: [users, { model: parents, include: users }] }, { model: classes }, { model: sections }] })
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async bus_route(id) {
        if (this._instance.schoolId, this._instance.sessionId) {
            return await bus_routes.destroy({ where: { id: id } })
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async drop_off(id) {
        if (this._instance.schoolId, this._instance.sessionId) {
            return await drop_offs.destroy({ where: { id: id } })
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async students_route(id) {
        if (this._instance.schoolId, this._instance.sessionId) {
            return await students_routes.destroy({ where: { id: id } })
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async salarie(id) {
        if (this._instance.schoolId, this._instance.sessionId) {
            return await salaries.destroy({ where: { id: id } })
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async routine(id) {
        if (this._instance.schoolId, this._instance.sessionId) {
            return await routines.destroy({ where: { id: id } })
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async noticeboard(id) {
        if (this._instance.schoolId, this._instance.sessionId) {
            return await noticeboard.destroy({ where: { id: id } })
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async menu(id) {
        // if (this._instance.schoolId, this._instance.sessionId) {
        return await menus.destroy({ where: { id: id } });
        // } else {
        //     throw new Error('user not authenticated!');
        // }
    }
    async main_menu(id) {
        if (this._instance.schoolId, this._instance.sessionId) {
            return await menus.destroy({ where: { parent: 0 } })
        } else {
            throw new Error('user not authenticated!');
        }
    }

    async sub_menu(id) {
        if (this._instance.schoolId, this._instance.sessionId) {
            return await menus.destroy({ where: { [Op.not]: { parent: 0 } } })
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async exam(id) {
        if (this._instance.schoolId, this._instance.sessionId) {
            return await exams.destroy({ where: { id: id } })
        } else {
            throw new Error('user not authenticated!');
        }
    }

    async expenses_category(id) {
        if (this._instance.schoolId, this._instance.sessionId) {
            return await expenses_categories.destroy({ where: { id: id } })
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async expense(id) {
        if (this._instance.schoolId, this._instance.sessionId) {
            return await expenses.destroy({ where: { id: id }, include: { model: expenses_categories, nested: false } })
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async frontend_setting(id) {
        if (this._instance.schoolId, this._instance.sessionId) {
            return await frontend_settings.destroy({ where: { id: id } })
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async frontend_gallery(id) {
        if (this._instance.schoolId, this._instance.sessionId) {
            return await frontend_gallery.destroy({ where: { id: id } })
        } else {
            throw new Error('user not authenticated!');
        }
    }

    async frontend_event(id) {
        if (this._instance.schoolId, this._instance.sessionId) {
            return await frontend_events.destroy({ where: { id: id } })
        } else {
            throw new Error('user not authenticated!');
        }
    }

    async grade(id) {
        if (this._instance.schoolId, this._instance.sessionId) {
            return await grades.destroy({ where: { id: id } })
        } else {
            throw new Error('user not authenticated!');
        }
    }

    async invoice(id) {
        if (this._instance.schoolId, this._instance.sessionId) {
            return await invoices.destroy({ where: { id: id }, include: [{ model: sessions, nested: false }, { model: classes, nested: false }, { model: students, include: users }] })
        } else {
            throw new Error('user not authenticated!');
        }
    }

    async invoice_item(id) {
        if (this._instance.schoolId, this._instance.sessionId) {
            console.log('id>>>>>>>>>::', id);
            let stockout = JSON.parse(JSON.stringify(await stockOuts.findOne({ where: { id: id }, include: { model: invoices } })));
            console.log(stockout);
            await invoice_stockOuts.destroy({ where: { invoiceId: stockout.invoices[0].id, stockOutId: stockout.id } });
            return await stockOuts.destroy({ where: { id: stockout.id } });
        } else {
            throw new Error('user not authenticated!');
        }
    }
}
module.exports = deletes;
