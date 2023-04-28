var multer = require('multer');
const path = require('path');
// const BaseUrl = require('../../../base');
// var url = BaseUrl;
// console.log("Multer:: ", url);


function upload() {
    this.setFilter = function (filterExtArray) {
        return (req, file, cb) => {
            let ext = path.extname(file.originalname);
            filterExtArray.forEach(f => {
                console.log('f', f, 'ext', ext);
                if (ext === f) {
                    cb(null, true);
                    return;
                }
            });

        }
    };
    this.setStorage = function (folder) {
        return multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, folder);
            },

            filename: function (req, file, cb) {
                (req.body.name) ?
                    cb(null, req.body.name.split(' ').join('_') + path.extname(file.originalname)) :
                    cb(null, file.originalname);
            }
        });
    };
    this.setStorages = function (folders) {
        if (typeof folders == 'object') {
            let ob = [];
            for (const folder of folders) {
                let ans = multer.diskStorage({
                    destination: function (req, files, cb) {
                        cb(null, folder);
                    },

                    filename: function (req, file, cb) {
                        console.log(file);
                        (req.body.name) ?
                            cb(null, req.body.name.split(' ').join('_') + '_' + file.fieldname + '_' + path.extname(file.originalname)) :
                            cb(null, file.originalname);

                    }
                });
                ob.push(ans);
            }
            return ob;
        }
    };
    this.settitleStorage = function (folder) {
        return multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, folder);
            },
            filename: function (req, file, cb) {
                (req.body.title) ?
                    cb(null, req.body.title.split(' ').join('_') + path.extname(file.originalname)) :
                    cb(null, file.originalname);
            }
        });
    };

    this.imageUploadPath = path.resolve(__dirname + '../../../../public/uploads/images/');
    this.fileUploadPath = path.resolve(__dirname + '../../../../public/uploads/files/');
    this.userImage = () => {
        return multer({
            storage: this.setStorage(this.imageUploadPath + '/users/'),
            fileFilter: this.setFilter(['.jpg', '.jpeg', '.png'])
        });
    }
    this.businessLogo = () => {
        let mults = this.setStorages([this.imageUploadPath + '/logos/', this.imageUploadPath + '/stamps/']);
        // console.log(mults);
        for (const mult of mults) {
            return multer({
                storage: mult,
                fileFilter: this.setFilter(['.jpg', '.jpeg', '.png']),
            });
        }

    }

    this.businessStamp = () => {
        return multer({
            storage: this.setStorage(this.imageUploadPath + '/stamps/'),
            fileFilter: this.setFilter(['.jpg', '.jpeg', '.png'])
        });
    }

    this.logo = () => {
        return multer({
            storage: this.setStorage(this.fileUploadPath + '/logos/'),
            fileFilter: this.setFilter(['.csv'])
        });
    }
    this.gallery = () => {
        return multer({
            storage: this.setStorage(this.imageUploadPath + '/gallery/january-2023/'),
            fileFilter: this.setFilter(['.jpg', '.jpeg'])
        });
    }

    this.userCsv = () => {
        return multer({
            storage: this.setStorage(this.fileUploadPath + '/users/csv_folder/'),
            fileFilter: this.setFilter(['.csv'])
        });
    }
    this.syllabus = () => {
        return multer({
            storage: this.settitleStorage(this.fileUploadPath + '/syllabus/'),
            fileFilter: this.setFilter(['.pdf', '.csv', '.docx', 'xlsx', '.txt'])
        });
    }

};

module.exports = new upload;