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
const { passwordHashVerify, passwordHash } = require('../services/service');
class Update {
    constructor(session) {
        this._SESSION = session;
    }
    async store(id, data) {
        return await stores.update(data, { where: { id: id } });
    };
    async business(id, data) {
        return await businesses.update(data, { where: { id: id } });
    };
    async deduction(id, data) {
        return await deductions.update(data, { where: { id: id } });
    };
    async session(id, data) {
        return await sessions.update(data, { where: { id: id } })
    }
    async book(id, data) {
        return await books.update(data, { where: { id: id } })
    }

    async bookIssue(id, data) {
        return await book_issues.update(data, { where: { id: id } })
    }

    async bus(id, data) {
        return await bus_routes.update(data, { where: { id: id } })
    }
    async attendance(id, data) {
        return await daily_attendances.update(data, { where: { id: id } })
    }
    async mark(id, data) {
        return await marks.update(data, { where: { id: id } })
    }
    async teacher_permissions(data, opt) {
        return await teachers_permissions.update(data, opt)
    }
    async currency(id, data) {
        return await currencies.update(data, { where: { id: id } });
    } 
    async country(id, data) {
        return await countries.update(data, { where: { id: id } });
    }
    async school(id, data) {
        return await schools.update(data, { where: { id: id } });
    }
    async classroom(id, data) {
        return await classrooms.update(data, { where: { id: id } });
    }

    async classes(id, data) {
        return await classes.update(data, { where: { id: id } });
    }
    async sectionBulk(data) {
        for (let i = 0; i < data.length; i++) {
            await sections.update(data[i], { where: { id: data[i].id } });
        }
        return true;
    }
    async section(id, data) {

        return await sections.update(data, { where: { id: id } });
    }
    async subject(id, data) {
        return await subjects.update(data, { where: { id: id } });
    }
    async user(id, data) {
        try {
            if (data.password != undefined) {
                console.log('am here!!!!!!!!!', data.password);
                let dbUser = JSON.parse(JSON.stringify(await users.findOne({ where: { id: id } })));
                if (passwordHashVerify(data.password, dbUser.salt, dbUser.hash)) {
                    let hash = await passwordHash(data.new_password);
                    data['hash'] = hash.hashHex;
                    data['salt'] = hash.salt;
                    data['iterations'] = hash.iterations;
                    return await users.update(data, { where: { id: id } });
                } else {
                    let hash = await passwordHash(data.password);
                    data['hash'] = hash.hashHex;
                    data['salt'] = hash.salt;
                    data['iterations'] = hash.iterations;
                    return await users.update(data, { where: { id: id } });
                    // let us = await users.build(data);
                    // return await users.update({ name: us.name, email: us.email, phone: us.phone, birthday: us.birthday, gender: us.gender, blood_group: us.blood_group, address: us.address }, { where: { id: id } });
                }
            } else {
                console.log('am here!!!!!!!!!2');
                let us = await users.build(data);
                return await users.update({ name: us.name, email: us.email, phone: us.phone, birthday: us.birthday, gender: us.gender, schoolId: us.schoolId, blood_group: us.blood_group, address: us.address }, { where: { id: id } });
            }
        } catch (err) {
            console.log(err);
            throw err;
        }


    }
    async smtp_setting(id, data) {
        return await smtp_settings.update(data, { where: { id: id } });
    }
    async setting(id, data) {
        return await settings.update(data, { where: { id: id } });
    }
    async parent(id, data) {
        let par = await parents.build(data);
        return await parents.update(par, { where: { id: id } });
    }
    async department(id, data) {
        return await departments.update(data, { where: { id: id } });
    }
    async teacher(id, data) {
        return await teachers.update(data, { where: { id: id } });
    }
    async student(id, data) {
        return await students.update(data, { where: { id: id } });
    }
    async enrols(id, data) {
        return await enrols.update(data, { where: { id: id } });
    }
    async bus_route(id, data) {
        return await bus_routes.update(data, { where: { id: id } });
    }
    async drop_off(id, data) {
        return await drop_offs.update(data, { where: { id: id } });
    }
    async students_route(id, data) {
        return await students_routes.update(data, { where: { id: id } });
    }
    async salary(id, data) {
        return await salaries.update(data, { where: { id: id } });
    }
    async routine(id, data) {
        return await routines.update(data, { where: { id: id } });
    }
    async noticeboard(id, data) {
        return await noticeboard.update(data, { where: { id: id } });
    }
    async menu(id, data) {
        return await menus.update(data, { where: { id: id } });
    }
    async exam(id, data) {
        return await exams.update(data, { where: { id: id } });
    }
    async expenses_category(id, data) {
        return await expenses_categories.update(data, { where: { id: id } });
    }
    async expense(id, data) {
        return await expenses.update(data, { where: { id: id } });
    }
    async frontend_setting(id, data) {
        return await frontend_settings.update(data, { where: { id: id } });
    }
    async frontend_gallerys(id, data) {
        return await frontend_gallery.update(data, { where: { id: id } });
    }
    async frontend_event(id, data) {
        return await frontend_events.update(data, { where: { id: id } });
    }
    async grade(id, data) {
        return await grades.update(data, { where: { id: id } });
    }
    async invoice(id, data) {
        return await invoices.update(data, { where: { id: id } });
    }
}
module.exports = Update;
