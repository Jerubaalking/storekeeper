const { Op } = require("../../../database/mysql");
const Controllers = require("../models/control");
const { businesses, users, item_categories, items} = require("../../../database/models/module_exporter");
let _many_module = 'businesses';
let _single_module = 'business';
module.exports = {
    index: async (req, res) => {
        const control = await new Controllers(req);
        let items_categories = JSON.parse(JSON.stringify(await (await control.findBy()).item_categories()));
        res.render('superadmin/items/index', { layout: false, categories: items_categories });
    },
    list: async (req, res) => {
        const control = await new Controllers(req);
        console.log(req.params);
        let items = JSON.parse(JSON.stringify(await (await control.findBy()).item({ where: { itemCategoryId: req.params.category }, include: { model: item_categories } })));
        console.log(items);
        res.render('superadmin/items/list', { layout: false, items: items.rows });
    },
    create: async (req, res) => {
        const control = await new Controllers(req);
        if (req.method == 'GET' && req.url == '/create') {
            let items_categories = JSON.parse(JSON.stringify(await (await control.findBy()).item_categories()));
            let stores = JSON.parse(JSON.stringify(await (await control.findBy()).store({ where: {} })));
            res.render('superadmin/items/create', { layout: false, categories: items_categories, stores: stores });
        } else {
            if (req.method == 'POST' && req.url.includes('/create')) {
                try {
                    console.log('its post:');
                    let data = req.body;
                    data.businessId = await (await control.getCurrentSession()).businessId;
                    data.sessionId = await (await control.getCurrentSession()).sessionId;
                    await (await control.create()).item(data);
                    res.json({ status: true, notification: 'successfully added items!' })
                } catch (err) {
                    res.json({ status: false, notification: 'failed to add items: ' + err.message })
                }
                return;
            }
        }

    },
    edit: async (req, res) => {
        const control = await new Controllers(req);
        if (req.method == 'GET' && req.url.includes('/edit')) {
            let items = await (await control.single()).item(req.params.id);
            let items_categories = JSON.parse(JSON.stringify(await (await control.findBy()).item_categories()));
            let stores = JSON.parse(JSON.stringify(await (await control.findBy()).store({ where: {} })));
            res.render('superadmin/items/edit', { layout: false, items_categories: items_categories, items: items, stores: stores });
            return;
        } else {
            if (req.method == 'POST' && req.url.includes('/edit')) {
                try {
                    console.log('its post:');
                    let data = req.body;
                    await (await control.update()).items(req.params.id, data);
                    res.json({ status: true, notification: 'successfully updated items!' })
                    return;
                } catch (err) {
                    res.json({ status: false, notification: 'failed to update items: ' + err.message })
                }
            }
        }
        return;

    },

    item_categoriesStores: async (req, res) => {
        const control = await new Controllers(req);
        try {
            let ans = JSON.parse(JSON.stringify(await (await control.findBy()).items({ where: { itemCategoryId: req.params.item_categories } })));
            console.log('items:', ans);
            res.render('superadmin/items/dropdown', { layout: false, items: await ans })
        } catch (err) {
            // res.render('superadmin/items/listByClassOptions', { layout: false, sessions: err.message })
            throw err;
        }
        return;

    },

    items: async (req, res) => {
        const control = await new Controllers(req);
        if (req.method == 'GET' && req.url.includes('/items')) {
            try {

                let _item_categories = await (await control.single()).item_categories(req.params.id);
                let ccl = await JSON.parse(JSON.stringify(await (await control.findBy()).section({ where: { item_categoriesId: _item_categories.id } })));
                _item_categories['items'] = ccl;
                let count = ccl.length;

                console.log(_item_categories);
                res.render('superadmin/items/items', { layout: false, item_categories: _item_categories, count: count });
            } catch (err) {
                res.json({ status: false, notification: 'failed to load items: ' + err.message })
            }
        } else {
            if (req.method == 'POST' && req.url.includes('/items')) {
                try {
                    console.log('its post:');
                    let data = req.body;
                    await (await control.update()).section(req.params.id, data);
                    res.json({ status: true, notification: 'successfully updated item_categories items!' })
                    return;
                } catch (err) {
                    res.json({ status: false, notification: 'failed to update item_categories items: ' + err.message })
                }
            }
        }
    },
}