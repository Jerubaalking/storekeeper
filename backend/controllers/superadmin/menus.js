const { spawnJwtPayload } = require("../services/handlers");
const Controllers = require("../models/control");
const { Op } = require("../../../database/mysql");
const menus = require("../../../database/models/menus");
module.exports = {
    index: async (req, res) => {
        console.log('req', req.url);
        res.render('superadmin/menus/index', { layout: false });
    },
    list: async (req, res) => {
        try {

            const control = new Controllers(req);
            let data = await (await control.find()).menus();
            console.log('menu data her:::', req.session.passport.user);
            res.render('superadmin/menus/list', { layout: false, menus: data, role: req.session.passport.user.role });
        } catch (err) {
            if (err.message == 'user not authenticated!') {
                res.redirect('/');
            }
        }
    },
    create: async (req, res) => {
        const control = new Controllers(req);

        if (req.method == 'GET' && req.url == '/create') {
            let parents = await (await control.findBy()).menu({ where: { parent: 0 } });
            // console.log(await parents);
            res.render('superadmin/menus/create', { layout: false, parents: await parents });
        } else {
            if (req.method == 'POST' && req.url.includes('/create')) {
                try {
                    let data = req.body;
                    data['admin'] = data.admin ? data.admin : 0;
                    data['parent'] = data.parentId ? data.parentId : 0;
                    data['business_admin'] = data.business_admin ? data.business_admin : 0;
                    data['business_manager'] = data.business_manager ? data.business_manager : 0;
                    data['business_accountant'] = data.business_accountant ? data.business_accountant : 0;
                    data['store_admin'] = data.store_admin ? data.store_admin : 0;
                    data['store_manager'] = data.store_manager ? data.store_manager : 0;
                    data['store_accountant'] = data.store_accountant ? data.store_accountant : 0;
                    data['store_sales'] = data.store_sales ? data.store_sales : 0;
                    data['store_marketing'] = data.store_marketing ? data.store_marketing : 0;
                    data['store_stocker'] = data.store_stocker ? data.store_stocker : 0;
                    console.log(data);
                    await (await new Controllers(req).create()).menu(data);
                    res.json({ status: true, notification: 'successfully added menu!' })
                } catch (err) {
                    console.log(err);
                    res.json({ status: false, notification: 'failed to add menu: ' + err.message })
                }
            }
        }

    },
    edit: async (req, res) => {
        const control = new Controllers(req);

        if (req.method == 'GET' && req.url.includes('/edit')) {
            let parents = await (await control.findBy()).menu({ where: { parent: 0 } });
            let menu = await (await new Controllers(req).single()).menu(req.params.id)
            res.render('superadmin/menus/edit', { layout: false, menu: menu, parents: parents });
        } else {
            if (req.method == 'POST' && req.url.includes('/edit')) {
                try {
                    console.log('its post:');
                    let data = req.body;
                    data['admin'] = data.admin ? data.admin : 0;
                    data['business_admin'] = data.business_admin ? data.business_admin : 0;
                    data['business_manager'] = data.business_manager ? data.business_manager : 0;
                    data['business_accountant'] = data.business_accountant ? data.business_accountant : 0;
                    data['store_admin'] = data.store_admin ? data.store_admin : 0;
                    data['store_manager'] = data.store_manager ? data.store_manager : 0;
                    data['store_accountant'] = data.store_accountant ? data.store_accountant : 0;
                    data['store_sales'] = data.store_sales ? data.store_sales : 0;
                    data['store_marketing'] = data.store_marketing ? data.store_marketing : 0;
                    data['store_stocker'] = data.store_stocker ? data.store_stocker : 0;
                    await (await new Controllers(req).update()).menu(req.params.id, data);
                    res.json({ status: true, notification: 'successfully updated menu!' })
                } catch (err) {
                    res.json({ status: false, notification: 'failed to update menu: ' + err.message })
                }
            }
        }

    },
    delete: async (req, res) => {
        try {
            const control = new Controllers(req);
            await (await control.delete()).menu(req.params.id);
            res.status(200).json({ status: true, notification: 'successfully removed menu!' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: false, notification: 'failed to remove menu' });
        }
    },

    permanentDelete: async (req, res) => {
        try {
            await menus.destroy({ where: { id: req.params.id }, paranoid: false })
            res.status(200).json({ status: true, notification: 'successfully removed menu!' });
        } catch (error) {
            res.status(500).json({ status: false, notification: 'failed to remove menu!' });
        }
    },

    visibility: async (req, res) => {
        try {
            const control = await new Controllers(req);
            await (await control.update()).menu(req.body.menuId, { [req.body.roleColumn]: req.body.value });
            res.json({ status: true, notification: 'successfully update menu!' })
        } catch (err) {
            res.json({ status: false, notification: 'failed to update menu: ' + err.message })
        }

    }
}