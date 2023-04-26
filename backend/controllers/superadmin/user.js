
const { Op } = require("../../../database/mysql");
const schools = require("../../../database/models/schools");
const Controllers = require("../models/control");
let _many_module = 'schools';
let _single_module = 'school';
module.exports = {
    index: async (req, res) => {
        console.log('req', req.url);
        res.render('superadmin/admin/index', { layout: false });
    },
    list: async (req, res) => {
        const control = await new Controllers(req);
        let admins = await (await control.findBy()).user({ where: { schoolId: 1, [Op.or]: [{ role: "superadmin" }, { role: "admin" }] }, include: [{ model: schools }] });

        console.log(admins);
        res.render('superadmin/admin/list', { layout: false, admins: JSON.parse(JSON.stringify(admins)) });
    },
    create: async (req, res) => {
        const control = await new Controllers(req);
        if (req.method == 'GET' && req.url == '/create') {
            let schools = await (await control.find()).schools();
            res.render('superadmin/admin/create', { layout: false, schools: schools });
        } else {
            if (req.method == 'POST' && req.url.includes('/create')) {
                try {
                    console.log('its post:');
                    let data = req.body;
                    await (await control.create()).user(data);
                    res.json({ status: true, notification: 'successfully added admin!' })
                } catch (err) {
                    res.json({ status: false, notification: 'failed to add admin: ' + err.message })
                }
            }
        }

    },
    edit: async (req, res) => {
        const control = await new Controllers(req);
        if (req.method == 'GET' && req.url.includes('/edit')) {
            let admin = await (await control.single()).user(req.params.id);
            let schools = await (await control.find()).schools();
            res.render('superadmin/admin/edit', { layout: false, admin: admin, schools: schools });
        } else {
            if (req.method == 'POST') {
                try {
                    console.log('its post:');
                    let data = req.body;
                    await (await control.update()).user(req.params.id, data);
                    res.json({ status: true, notification: 'successfully updated admin!' })
                } catch (err) {
                    res.json({ status: false, notification: 'failed to update admin: ' + err.message })
                }
            }
        }

    },

    activateSession: async (req, res) => {
        const control = await new Controllers(req);
        try {
            let oldSession = JSON.parse(JSON.stringify(await (await control.findBy()).admin({ where: { status: 1 } })));
            if (oldSession) {
                console.log(oldSession);
                await (await control.update()).admin(oldSession[0].id, { status: 0 });
            }
            await (await control.update()).admin(req.params.id, { status: 1 });
            res.json({ status: true, notification: 'successfully activated admin!' })
        } catch (err) {
            res.json({ status: false, notification: 'failed to activate admin: ' + err.message })
        }

    }
}