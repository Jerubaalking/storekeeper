
const { Op } = require("../../../database/mysql");
const Controllers = require("../models/control");
let _many_module = 'businesses';
let _single_module = 'business';
module.exports = {
    index: async (req, res) => {
        console.log('req', req.url);
        res.render('superadmin/item_categories/index', { layout: false });
    },
    list: async (req, res) => {
        const control = await new Controllers(req);
        let cl = JSON.parse(JSON.stringify(await (await control.findBy()).item_categories()));
        let item_categories = [];
        // for (const _class of cl) {
        //     let ccl = await JSON.parse(JSON.stringify(await (await control.findBy()).section({ where: { classId: _class.id } })));
        //     _class['sections'] = ccl;
        //     item_categories.push(_class);
        // }

        // console.log(item_categories);
        res.render('superadmin/item_categories/list', { layout: false, item_categories: cl });
    },
    create: async (req, res) => {

        if (req.method == 'GET' && req.url == '/create') {
            res.render('superadmin/item_categories/create', { layout: false });
        } else {
            console.log('its post:');
            const control = await new Controllers(req);
            if (req.method == 'POST' && req.url.includes('/create')) {
                try {
                    console.log('its post:');
                    await (await control.create()).item_category(req.body);
                    res.json({ status: true, notification: 'successfully added item category!' })
                } catch (err) {
                    res.json({ status: false, notification: 'failed to add item category: ' + err.message })
                }
                return;
            }
        }

    },
    edit: async (req, res) => {

        if (req.method == 'GET' && req.url.includes('/edit')) {
            const control = await new Controllers(req);
            let admin = await (await control.single()).item_categories(req.params.id);
            let businesses = await (await control.find()).businesses();
            res.render('superadmin/item_categories/edit', { layout: false, class: admin, businesses: businesses });
            return;
        } else {
            if (req.method == 'POST') {
                try {
                    console.log('its post:');
                    let data = req.body;
                    await (await new Controllers(req).create()).user(req.params.id, data);
                    res.json({ status: true, notification: 'successfully updated admin!' })
                    return;
                } catch (err) {
                    res.json({ status: false, notification: 'failed to update admin: ' + err.message })
                }
            }
        }
        return;

    },

    classSection: async (req, res) => {
        try {
            let ans = await (await new Controllers(req).findBy()).section({ where: { classId: req.params.class } });
            console.log('ans', await ans, req.url);
            res.render('superadmin/item_categories/listByClassOptions', { layout: false, item_categories: await ans })
        } catch (err) {
            // res.render('superadmin/item_categories/listByClassOptions', { layout: false, sessions: err.message })
            throw err;
        }
        return;

    },

    sections: async (req, res) => {

        if (req.method == 'GET' && req.url.includes('/sections')) {
            try {
                const control = await new Controllers(req);
                let _class = JSON.parse(JSON.stringify(await (await control.single()).class(req.params.id)));
                let ccl = await JSON.parse(JSON.stringify(await (await control.findBy()).section({ where: { classId: _class.id } })));
                _class['sections'] = ccl;
                let count = ccl.length;

                console.log(_class);
                res.render('superadmin/item_categories/sections', { layout: false, class: _class, count: count });
            } catch (err) {
                res.json({ status: false, notification: 'failed to load sections: ' + err.message })
            }
        } else {
            if (req.method == 'POST' && req.url.includes('/sections')) {
                try {
                    console.log('its post:', req.body);
                    let data = req.body;
                    dataObj = [];
                    dataUpdateObj = [];
                    for (const i in data.sectionId) {
                        if (data.sectionId[i] == 0) {
                            if (data.name[i] != '') {
                                dataObj.push({ name: data.name[i], classId: req.params.id })
                            }
                        } else {
                            dataUpdateObj.push({ id: data.sectionId[i], name: data.name[i], classId: req.params.id })
                        }
                    }
                    console.log('its post:', dataUpdateObj, dataObj);
                    await (await new Controllers(req).update()).sectionBulk(dataUpdateObj);
                    await (await new Controllers(req).create()).sectionBulk(dataObj);
                    res.json({ status: true, notification: 'successfully updated class sections!' })
                    return;
                } catch (err) {
                    console.log(err);
                    res.json({ status: false, notification: 'failed to update class sections: ' + err.message })
                }
            }
        }
    },
}