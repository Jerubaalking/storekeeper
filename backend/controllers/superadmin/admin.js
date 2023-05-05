const update = require("../models/updates");
const creates = require("../models/creates");
const finds = require("../models/finds");
const single = require("../models/single");
const findby = require("../models/findBy");
const { Op } = require("../../../database/mysql");
const { businesses, users } = require("../../../database/models/module_exporter");
const Controllers = require("../models/control");
let _many_module = 'businesses';
let _single_module = 'school';
module.exports = {
    index: async (req, res) => {
        console.log('req', req.url);
        res.render('superadmin/admin/index', { layout: false });
    },
    list: async (req, res) => {

        let roles = await (await new Controllers(req).findBy()).role({ where: { role: "admin" }, include: [{ model: users }] });
        console.log(roles[0].users[0]);
        if (roles[0].users) {
            res.render('superadmin/admin/list', { layout: false, admins: roles[0].users, message: "success!" });
        } else {
            res.render('superadmin/admin/list', { layout: false, admins: roles[0].users, message: "success!" });
        }
    },
    create: async (req, res) => {

        if (req.method == 'GET' && req.url == '/create') {
            res.render('superadmin/admin/create', { layout: false });
        } else {
            if (req.method == 'POST' && req.url.includes('/create')) {
                try {
                    console.log('its post:');
                    let data = req.body;
                    data.role = 'admin';
                    await (await new Controllers(req).create()).user(data);
                    res.json({ status: true, notification: 'successfully added admin!' })
                } catch (err) {
                    res.json({ status: false, notification: 'failed to add admin: ' + err.message })
                }
            }
        }

    },
    edit: async (req, res) => {

        if (req.method == 'GET' && req.url.includes('/edit')) {
            let admin = await (await new Controllers(req).single()).user(req.params.id);
            let businesses = await (await new Controllers(req).find()).businesses();
            res.render('superadmin/admin/edit', { layout: false, admin: JSON.parse(JSON.stringify(admin)), businesses: JSON.parse(JSON.stringify(businesses)) });
        } else {
            if (req.method == 'POST') {
                try {
                    console.log('its post:');
                    let data = req.body;
                    await update.user(req.params.id, data);
                    res.json({ status: true, notification: 'successfully updated admin!' })
                } catch (err) {
                    res.json({ status: false, notification: 'failed to update admin: ' + err.message })
                }
            }
        }

    },

    activateSession: async (req, res) => {
        try {
            let oldSession = JSON.parse(JSON.stringify(await findby.admin({ where: { status: 1 } })));
            if (oldSession) {
                console.log(oldSession);
                await update.admin(oldSession[0].id, { status: 0 });
            }
            await update.admin(req.params.id, { status: 1 });
            res.json({ status: true, notification: 'successfully activated admin!' })
        } catch (err) {
            res.json({ status: false, notification: 'failed to activate admin: ' + err.message })
        }

    }
}