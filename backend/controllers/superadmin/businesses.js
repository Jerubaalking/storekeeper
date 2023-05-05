const update = require("../models/updates");
const creates = require("../models/creates");
const finds = require("../models/finds");
const single = require("../models/single");
const findby = require("../models/findBy");
const { Op } = require("../../../database/mysql");
const Controllers = require("../models/control");
let _many_module = 'businesses';
let _single_module = 'school';
module.exports = {
    index: async (req, res) => {
        console.log('req', req.url);
        res.render('superadmin/businesses/index', { layout: false });
    },
    list: async (req, res) => {

        let businesses = await (await new Controllers(req).findBy()).business({});
        console.log('business>>>>>>>>>:', businesses);
        res.render('superadmin/businesses/list', { layout: false, businesses: businesses });

    },
    create: async (req, res) => {

        if (req.method == 'GET' && req.url == '/create') {
            res.render('superadmin/businesses/create', { layout: false });
        } else {
            if (req.method == 'POST' && req.url.includes('/create')) {
                try {
                    if (req.files) {
                        let data = req.body;
                        for (const file of req.files) {
                            if (file.fieldname == 'business_logo') {
                                data['logo'] = file.path.split('storekeeper')[1];
                            }
                            if (file.fieldname == 'business_stamp') {
                                data['stamp'] = file.path.split('storekeeper')[1];
                            }
                        }
                        console.log('its post:', data);
                        await (await new Controllers(req).create()).business(data);
                        res.json({ status: true, notification: 'successfully added admin!' });
                    }
                } catch (err) {
                    res.json({ status: false, notification: 'failed to add admin: ' + err.message })
                }
            }
        }

    },
    edit: async (req, res) => {

        if (req.method == 'GET' && req.url.includes('/edit')) {
            let business = await (await new Controllers(req).single()).business(req.params.id);
            console.log(business);
            res.render('superadmin/businesses/edit', { layout: false, business: JSON.parse(JSON.stringify(business)) });
        } else {
            if (req.method == 'POST' && req.url.includes('/edit')) {
                try {
                    console.log('its post:');
                    if (req.files) {
                        let data = req.body;
                        for (const file of req.files) {
                            if (file.fieldname == 'business_logo') {
                                data['logo'] = file.path.split('storekeeper')[1];
                            }
                            if (file.fieldname == 'business_stamp') {
                                data['stamp'] = file.path.split('storekeeper')[1];
                            }
                        }
                        console.log('its post:', data);
                        await (await new Controllers(req).update()).business(req.params.id, data);
                        res.json({ status: true, notification: 'successfully added admin!' });
                    } else {
                        if (req.file) {
                            let data = req.body;
                            if (req.file.fieldname == 'business_logo') {
                                data['logo'] = file.path.split('storekeeper')[1];
                            }
                            if (req.file.fieldname == 'business_stamp') {
                                data['stamp'] = file.path.split('storekeeper')[1];
                            }
                            console.log('its post:', data);
                            await (await new Controllers(req).update()).business(req.params.id, data);
                            res.json({ status: true, notification: 'successfully added admin!' });
                        } else {
                            await (await new Controllers(req).update()).business(req.params.id, data);
                            res.json({ status: true, notification: 'successfully added admin!' });
                        }
                    }
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