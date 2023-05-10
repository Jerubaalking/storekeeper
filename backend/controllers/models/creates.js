const client_business_roles = require('../../../database/models/client_business_roles');
const clients = require('../../../database/models/clients');
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

class Creates {
    constructor(session) {
        this._instance = session;
    }

    async business(data) {
        console.log(this._instance);
        // if (this._instance) {
        let business = await businesses.build(data);
        return await business.save()
        // } else {
        //     throw new Error('user not authenticated!');
        // }
    };
    async store(data) {
        if (this._instance.businessId, this._instance.sessionId) {
            let store = await stores.build(data);
            store.businessId = await this._instance.businessId;
            store.sessionId = await this._instance.sessionId;
            return await store.save()
        } else {
            throw new Error('user not authenticated!');
        }
    };

    async item_category(data) {
        if (this._instance.businessId, this._instance.sessionId) {
            let item_category = await item_categories.build(data);
            return await item_category.save()
        } else {
            throw new Error('user not authenticated!');
        }
    };
    async item(data) {
        if (this._instance.businessId, this._instance.sessionId) {
            let item = await items.build(data);
            return await item.save()
        } else {
            throw new Error('user not authenticated!');
        }
    };
    async syllabus(data) {
        if (this._instance.businessId, this._instance.sessionId) {
            let syllabus = await syllabuses.build(data);
            syllabus.businessId = await this._instance.businessId;
            syllabus.sessionId = await this._instance.sessionId;
            return await syllabus.save()
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async deduction(data) {
        if (this._instance.businessId, this._instance.sessionId) {
            data.businessId = await this._instance.businessId;
            data.sessionId = await this._instance.sessionId;
            console.log(await data);
            let deduction = await deductions.build(data);
            return await deduction.save()
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async deduction_charts(data) {
        if (this._instance.businessId, this._instance.sessionId) {
            let deduction_charts = await deductions_charts.build(data);
            deduction_charts.businessId = await this._instance.businessId;
            deduction_charts.sessionId = await this._instance.sessionId;
            return await deduction_charts.save()
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async stockIn(data) {
        try {
            console.log("DATA>>>::", data);

            if (this._instance.businessId, this._instance.sessionId) {
                let valArray = [];
                for (let i = 0; i < data.qty.length; i++) {
                    let dt = {
                        storeId: data.storeId,
                        item_batch_number: data.item_batch_number,
                        manufacture_batch_number: data.manufacturer_batch_number[i],
                        itemId: data.itemId[i],
                        qty: data.qty[i],
                        selling_price: data.selling_price[i],
                        amount: data.amount[i],
                        manufacturer: data.manufacturer[i],
                        receive_date: data.receive_date,
                        receipt: data.receipt[i],
                        inspected: (data['inspected']) ? true : false,
                        other_specs: (data['other_specs'][i]) ? data.other_specs[i] : null,
                        item_weight: (data['item_weight'][i]) ? data.item_weight[i] : '0 unknown',
                        expire_date: (data['expire_date'][i]) ? data.expire_date[i] : null,
                        businessId: await this._instance.businessId,
                        sessionId: await this._instance.sessionId,
                        comment: data.comment[i]
                    }
                    valArray.push(dt);
                }
                return await stockIns.bulkCreate(valArray);
            } else {
                throw new Error('user not authenticated!');
            }
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    async stockOut(data) {
        if (this._instance.businessId, this._instance.sessionId) {
            let valArray = [];
            for (let i = 0; i < data.qty.length; i++) {
                let dt = {
                    storeId: data.storeId,
                    customerId: data.customerId,
                    itemId: data.itemId[i],
                    qty: data.qty[i],
                    selling_price: data.selling_price[i],
                    title: data.item_batch_number,
                    itemCategoryId: data.itemCategoryId[i],
                    businessId: await this._instance.businessId,
                    sessionId: await this._instance.sessionId,
                }
                valArray.push(dt);
            }
            return await stockOuts.bulkCreate(valArray);
        } else {
            throw new Error('user not authenticated!');
        }
    }

    async bookIssue(data) {
        if (this._instance.businessId, this._instance.sessionId) {
            let book = await book_issues.build(data);
            book.businessId = await this._instance.businessId;
            book.sessionId = await this._instance.sessionId;
            return await book.save()
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async bus(data) {
        if (this._instance.businessId, this._instance.sessionId) {
            let bus = await bus_routes.build(data);
            bus.businessId = await this._instance.businessId;
            bus.sessionId = await this._instance.sessionId;
            return await bus.save()
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async attendance(data) {
        if (this._instance.businessId, this._instance.sessionId) {
            let attendance = await daily_attendances.build(data);
            attendance.businessId = await this._instance.businessId;
            attendance.sessionId = await this._instance.sessionId;
            return await attendance.save()
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async session(data) {
        if (this._instance.businessId, this._instance.sessionId) {
            let session = await sessions.build(data);
            return await session.save()
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async mark(data) {
        if (this._instance.businessId, this._instance.sessionId) {
            let mark = await marks.build(data);
            mark.businessId = await this._instance.businessId;
            mark.sessionId = await this._instance.sessionId;
            return await mark.save()
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async teacher_permissions(data) {
        if (this._instance.businessId, this._instance.sessionId) {
            try {
                (!data['column_name'] == 'marks') ? data['marks'] == data['value'] : data['marks'] = 0;
                (!data['column_name'] == 'assignment') ? data['assignment'] == data['value'] : data['assignment'] = 0;
                (!data['column_name'] == 'attendance') ? data['attendance'] == data['value'] : data['attendance'] = 0;
                (!data['column_name'] == 'online_exams') ? data['online_exams'] == data['value'] : data['online_exams'] = 0;

                let tperm = await teachers_permissions.build(data);
                tperm.businessId = await this._instance.businessId;
                tperm.sessionId = await this._instance.sessionId;
                return await tperm.save()

            } catch (err) {
                console.log(err);
                throw err;
            }
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async currency(data) {
        // if (this._instance.businessId, this._instance.sessionId) {
        let currency = await currencies.build(data);
        return await currency.save()
        // } else {
        //     throw new Error('user not authenticated!');
        // }
    }
    async school(data) {
        if (this._instance.businessId, this._instance.sessionId) {
            let school = await schools.build(data);
            return await school.save()
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async classroom(data) {
        if (this._instance.businessId, this._instance.sessionId) {
            let classroom = await classrooms.build(data);
            classroom.businessId = await this._instance.businessId;
            classroom.sessionId = await this._instance.sessionId;
            return await classroom.save()
        } else {
            throw new Error('user not authenticated!');
        }
    }

    async classes(data) {
        if (this._instance.businessId, this._instance.sessionId) {
            let classe = await classes.build(data);
            classe.businessId = await this._instance.businessId;
            classe.sessionId = await this._instance.sessionId;
            return await classe.save()
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async section(data) {
        if (this._instance.businessId, this._instance.sessionId) {
            let section = await sections.build(data);
            section.businessId = await this._instance.businessId;
            section.sessionId = await this._instance.sessionId;
            return await section.save()
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async sectionBulk(data) {
        if (this._instance.businessId, this._instance.sessionId) {
            let sectionz = await sections.bulkCreate(data);
            console.log(sectionz);
            return await sectionz
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async subject(data) {
        if (this._instance.businessId, this._instance.sessionId) {
            let subject = await subjects.build(data);
            subject.businessId = await this._instance.businessId;
            subject.sessionId = await this._instance.sessionId;
            return await subject.save()
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async user(data) {
        if (typeof data.phone == typeof []) {
            let inData = {
                name: data.name,
                email: data.email,
                password: data.password,
                gender: data.gender,
                role: data.role,
                phone: data.phone[0],
                address: data.address[0],
            };
            let usrPass = data.password;
            console.log(inData);
            let hash = await passwordHash(usrPass);
            let nUser = await users.build(inData);
            nUser.hash = hash.hashHex;
            nUser.salt = hash.salt;
            nUser.iterations = hash.iterations;
            nUser.businessId = await inData.businessId;
            nUser.sessionId = await this._instance.sessionId;
            await nUser.save();
            let role = await roles.findOne({ where: { role: inData.role } });
            let user_role = JSON.parse(JSON.stringify(await nUser.addRole(role)));
            console.log('user role....', user_role);
            await user_roles.update({ businessId: inData.businessId }, { where: { id: user_role[0].id } })
            return nUser;
        } else {
            let usrPass = data.password;
            console.log(data);
            let hash = await passwordHash(usrPass);
            let nUser = await users.build(data);
            nUser.hash = hash.hashHex;
            nUser.salt = hash.salt;
            nUser.iterations = hash.iterations;
            nUser.businessId = await data.businessId;
            nUser.sessionId = await this._instance.sessionId;
            await nUser.save();
            let role = await roles.findOne({ where: { role: data.role } });
            let user_role = JSON.parse(JSON.stringify(await nUser.addRole(role)));
            console.log('user role....', user_role);
            await user_roles.update({ businessId: data.businessId }, { where: { id: user_role[0].id } })
            return nUser;
        }
    }
    async client(data) {

        console.log('am here', data);

        if (this._instance.sessionId) {

            let usrPass = data.password;
            console.log(data);
            let addresses = data.address;
            let phones = data.phone;
            data.address = addresses[0];
            data.phone = phones[0];
            data.sessionId = await this._instance.sessionId;
            let oldUser = JSON.parse(JSON.stringify(await users.findAndCountAll({ where: { email: data.email } })));
            console.log(oldUser);
            if (oldUser.count <= 0) {
                let hash = await passwordHash(usrPass);
                let nUser = await users.build(data);
                nUser.hash = hash.hashHex;
                nUser.salt = hash.salt;
                nUser.iterations = hash.iterations;
                console.log('added data01', nUser);
                await nUser.save();
                console.log('added data02', data);
                // add user to clients
                let client = await clients.create({ userId: nUser.id, sessionId: data.sessionId });
                // add client to business roles
                let business = await businesses.findOne({ where: { id: data.businessId } });
                let role = await roles.findOne({ where: { role: 'admin' } });
                // add client to business
                try {
                    await client.addBusiness(business);
                    let clientRole = await client.addRole(role);
                    let clientBusinessRole = await client_business_roles.update({ businessId: data.businessId }, { where: { id: JSON.parse(JSON.stringify(await clientRole)) } });
                    // await role.addBusiness(business);
                    console.log('client business role', clientBusinessRole);
                } catch (errr) {
                    console.log(errr);
                }
                // add role to client
                let newClient = await clients.findOne({ where: { id: JSON.parse(JSON.stringify(await client)).id }, include: { model: users } });

                return await newClient;
            } else {
                throw new Error('email registered already');
            }

        } else {
            throw new Error('user not authenticated!');
        }

    }

    async signup(data) {
        // if (this._instance.businessId, this._instance.sessionId) {
        let usrPass = data.password;
        let hash = await passwordHash(usrPass);
        let nUser = await users.build(data);
        nUser.hash = hash.hashHex;
        nUser.salt = hash.salt;
        nUser.iterations = hash.iterations;
        nUser.businessId = data.businessId;
        console.log('data in db:::', data);
        return await nUser.save()
        // } else {
        //     throw new Error('user not authenticated!');
        // }
    }
    async smtp_setting(data) {
        if (this._instance.businessId, this._instance.sessionId) {
            let smtp_setting = await smtp_settings.build(data);
            return await smtp_setting.save()
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async setting(data) {
        if (this._instance.businessId, this._instance.sessionId) {
            let setting = await settings.build(data);
            return await setting.save()
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async personel(data) {
        if (this._instance.businessId, this._instance.sessionId) {
            try {
                let olUser = await users.build(data);
                olUser = await olUser.save();
                data.userId = olUser.id;
                console.log('setting user id', data.userId, 'of ', olUser.name, 'to personel');
                let personel = await personels.build(data);
                personel.businessId = await this._instance.businessId;
                personel.sessionId = await this._instance.sessionId;
                let pp = await personel.save();
                data.personelId = pp.id;

                let user_role = await user_roles.build(data);
                user_role.businessId = await this._instance.businessId;
                user_role.roleId = 4;
                user_role.save();

                return await personel;
            } catch (err) {
                console.log(err);
                throw err;
            }
        } else {
            throw new Error('user not authenticated!');
        };
    }
    async department(data) {
        if (this._instance.businessId, this._instance.sessionId) {
            let department = await departments.build(data);
            department.businessId = await this._instance.businessId;
            department.sessionId = await this._instance.sessionId;
            return await department.save()
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async teacher(data) {
        if (this._instance.businessId, this._instance.sessionId) {
            try {

                let user = await this.user(data);
                data.userId = user.id;
                console.log('setting user id', user.id, 'of ', user, 'to teacher');
                let teacher = await teachers.build(data);
                teacher.businessId = await this._instance.businessId;
                teacher.sessionId = await this._instance.sessionId;
                await teacher.save()

                return await teacher;
            } catch (err) {
                console.log(err);
                throw err;
            }
        } else {
            throw new Error('user not authenticated!');
        };
    }
    async student(data) {
        if (this._instance.businessId, this._instance.sessionId) {
            try {
                let code = await generateUniqueIdentifier();
                data.code = code;
                data['sessionId'] = 1;
                data['businessId'] = 1;

                let user = JSON.parse(JSON.stringify(await this.user(data)));
                console.log('user::', await user);
                data.userId = await user.id;
                let student = await students.build(data);
                student.businessId = await this._instance.businessId;
                student.sessionId = await this._instance.sessionId;
                await student.save()

                data.studentId = student.id;
                let enrol = await enrols.build(data);
                return await enrol.save()


            } catch (err) {
                throw err;
            }
        } else {
            throw new Error('user not authenticated!');
        };
    }
    async bulkCustomer(data) {
        if (this._instance.businessId, this._instance.sessionId) {
            let all = [];
            try {
                console.log(data.name);
                for (var i = 0; i < data.name.length; i++) {
                    let code = await generateUniqueIdentifier('CIN');
                    let customer = { name: data.name[i], code: code, address: data.address[i], phone: data.phone[i], email: data.email[i], tin: data.tin[i], personelId: parseInt(data.personelId[i]), storeId: parseInt(data.storeId[i]), sessionId: this._instance.sessionId, businessId: (this._instance.businessId) ? this._instance.businessId : 1 };
                    console.log('customer>>>>>>', customer);
                    let c = await customers.create(customer);
                    c = JSON.parse(JSON.stringify(await c));
                    console.log(c);

                    let enr = { personelId: parseInt(data.personelId[i]), storeId: parseInt(data.storeId[i]), sessionId: this._instance.sessionId, businessId: (this._instance.businessId) ? this._instance.businessId : 1, customerId: parseInt(c.id) };

                    all.push(enr);
                }
                /**add users first */
                console.log(all);
                return await enrols.bulkCreate(all);
            } catch (err) {
                console.log(err);
                throw err;
            }
        } else {
            throw new Error('user not authenticated!');
        };
    }
    async bus_route(data) {
        if (this._instance.businessId, this._instance.sessionId) {
            let bus_route = await bus_routes.build(data);
            bus_route.businessId = await this._instance.businessId;
            bus_route.sessionId = await this._instance.sessionId;
            return await bus_route.save()
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async drop_off(data) {
        if (this._instance.businessId, this._instance.sessionId) {
            let drop_off = await drop_offs.build(data);
            drop_off.businessId = await this._instance.businessId;
            drop_off.sessionId = await this._instance.sessionId;
            return await drop_off.save()
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async students_route(data) {
        if (this._instance.businessId, this._instance.sessionId) {
            let students_route = await students_routes.build(data);
            students_route.businessId = await this._instance.businessId;
            students_route.sessionId = await this._instance.sessionId;
            return await students_route.save()
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async salary(data) {
        if (this._instance.businessId, this._instance.sessionId) {
            let salary = await salaries.build(data);
            salary.businessId = await this._instance.businessId;
            salary.sessionId = await this._instance.sessionId;
            return await salary.save()
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async routine(data) {
        if (this._instance.businessId, this._instance.sessionId) {
            let routine = await routines.build(data);
            routine.businessId = await this._instance.businessId;
            routine.sessionId = await this._instance.sessionId;
            return await routine.save()
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async noticeboard(data) {
        if (this._instance.businessId, this._instance.sessionId) {
            let noticeboards = await noticeboard.build(data);
            return await noticeboards.save()
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async menu(data) {
        // if (this._instance.businessId, this._instance.sessionId) {
        data['superadmin'] = 1;
        let menu = await menus.build(data);
        return await menu.save()
        // } else {
        //     throw new Error('user not authenticated!');
        // }
    }
    async exam(data) {
        if (this._instance.businessId, this._instance.sessionId) {
            console.log(this._instance);
            data.businessId = await this._instance.businessId;
            data.sessionId = await this._instance.sessionId;
            let exam = await exams.build(data);
            return await exam.save()
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async expenses_category(data) {
        if (this._instance.businessId, this._instance.sessionId) {
            data['businessId'] = this._instance.businessId;
            data['sessionId'] = this._instance.sessionId;
            let expenses_category = await expenses_categories.build(data);
            return await expenses_category.save()
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async expense(data) {
        if (this._instance.businessId, this._instance.sessionId) {
            data['businessId'] = this._instance.businessId;
            data['sessionId'] = this._instance.sessionId;
            let expense = await expenses.build(data);
            return await expense.save()
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async frontend_setting(data) {
        if (this._instance.businessId, this._instance.sessionId) {
            let frontend_setting = await frontend_settings.build(data);
            return await frontend_setting.save()
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async frontend_gallerys(data) {
        if (this._instance.businessId, this._instance.sessionId) {
            let frontend_gallerys = await frontend_gallery.build(data);
            return await frontend_gallerys.save()
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async frontend_event(data) {
        if (this._instance.businessId, this._instance.sessionId) {
            let frontend_event = await frontend_events.build(data);
            return await frontend_event.save()
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async grade(data) {
        if (this._instance.businessId, this._instance.sessionId) {
            let grade = await grades.build(data);
            grade.businessId = await this._instance.businessId;
            grade.sessionId = await this._instance.sessionId;
            return await grade.save()
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async invoice(data) {
        if (this._instance.businessId, this._instance.sessionId) {
            let invoice = await invoices.build(data);
            invoice.businessId = await this._instance.businessId;
            invoice.sessionId = await this._instance.sessionId;
            return await invoice.save()
        } else {
            throw new Error('user not authenticated!');
        }
    }
    async invoice_items(id, data) {
        if (this._instance.businessId, this._instance.sessionId) {
            let invoice1 = await invoices.findOne({ where: { id: id } });
            let invoice = JSON.parse(JSON.stringify(invoice1));
            for (let i = 0; i < data.itemId.length; i++) {
                let tdata = {
                    storeId: invoice.storeId,
                    customerId: invoice.customerId,
                    itemId: data.itemId[i],
                    stockInId: data.stockIn[i],
                    qty: data.qty[i],
                    discount_amount: (data.discount_amount) ?
                        data.discount_amount[i] : 0.0,
                    discount_percent: (data.discount_percent) ?
                        data.discount_percent[i] : 0.0,
                    sessionId: invoice.sessionId,
                    businessId: this._instance.businessId,
                }
                let stockOut = await stockOuts.create(tdata);
                await stockOut.addInvoice(invoice1);
            }
            let invoice2 = JSON.parse(JSON.stringify(await invoices.findOne({ where: { id: id }, include: { model: stockOuts, include: { model: items } } })));
            console.log(invoice2);
            return invoice2;
        } else {
            throw new Error('user not authenticated!');
        }
    }
}
module.exports = Creates;
