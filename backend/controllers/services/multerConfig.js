var multer = require('multer');
const path = require('path');
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");

// create s3 instance using S3Client 
// (this is how we create s3 instance in v3)
const s3 = new S3Client({
    credentials: {
        accessKeyId: "DO00XRHCZJXNHVCLM3BD", // store it in .env file to keep it safe
        secretAccessKey: "Q/ocb3SsC7/85rYcjff5hEXcKqI2+hw6mpniz7KptlA"
    },
    region: "ap-south-1" // this is the region that you select in AWS account
})
const s3StorageUser = multerS3({
    s3: s3, // s3 instance
    bucket: "https://saincrafttechnologies-static-public-2023.fra1.digitaloceanspaces.com/public/uploads/images/users", // change it as per your project requirement
    acl: "public-read", // storage access type
    metadata: (req, file, cb) => {
        cb(null, { fieldname: file.fieldname })
    },
    key: (req, file, cb) => {
        const fileName = req.body.name.split(' ').join('_') + '_' + file.fieldname + '_' + path.extname(file.originalname);
        cb(null, fileName);
    }
});
const s3StorageLogo = multerS3({
    s3: s3, // s3 instance
    bucket: "https://saincrafttechnologies-static-public-2023.fra1.digitaloceanspaces.com/public/uploads/images/logos", // change it as per your project requirement
    acl: "public-read", // storage access type
    metadata: (req, file, cb) => {
        cb(null, { fieldname: file.fieldname })
    },
    key: (req, file, cb) => {
        const fileName = req.body.name.split(' ').join('_') + '_' + file.fieldname + '_' + path.extname(file.originalname);
        cb(null, fileName);
    }
});
const s3StorageGallery = multerS3({
    s3: s3, // s3 instance
    bucket: "https://saincrafttechnologies-static-public-2023.fra1.digitaloceanspaces.com/public/uploads/images/gallery", // change it as per your project requirement
    acl: "public-read", // storage access type
    metadata: (req, file, cb) => {
        cb(null, { fieldname: file.fieldname })
    },
    key: (req, file, cb) => {
        const fileName = req.body.name.split(' ').join('_') + '_' + file.fieldname + '_' + path.extname(file.originalname);
        cb(null, fileName);
    }
});
const s3StorageStamp = multerS3({
    s3: s3, // s3 instance
    bucket: "https://saincrafttechnologies-static-public-2023.fra1.digitaloceanspaces.com/public/uploads/images/stamps", // change it as per your project requirement
    acl: "public-read", // storage access type
    metadata: (req, file, cb) => {
        cb(null, { fieldname: file.fieldname })
    },
    key: (req, file, cb) => {
        const fileName = req.body.name.split(' ').join('_') + '_' + file.fieldname + '_' + path.extname(file.originalname);
        cb(null, fileName);
    }
});
const s3StorageCsv = multerS3({
    s3: s3, // s3 instance
    bucket: "https://saincrafttechnologies-static-public-2023.fra1.digitaloceanspaces.com/public/uploads/csv", // change it as per your project requirement
    acl: "public-read", // storage access type
    metadata: (req, file, cb) => {
        cb(null, { fieldname: file.fieldname })
    },
    key: (req, file, cb) => {
        const fileName = req.body.name.split(' ').join('_') + '_' + file.fieldname + '_' + path.extname(file.originalname);
        cb(null, fileName);
    }
});
const s3StorageFilePDF = multerS3({
    s3: s3, // s3 instance
    bucket: "https://saincrafttechnologies-static-public-2023.fra1.digitaloceanspaces.com/public/uploads/files/pdf", // change it as per your project requirement
    acl: "public-read", // storage access type
    metadata: (req, file, cb) => {
        cb(null, { fieldname: file.fieldname })
    },
    key: (req, file, cb) => {
        const fileName = req.body.name.split(' ').join('_') + '_' + file.fieldname + '_' + path.extname(file.originalname);
        cb(null, fileName);
    }
});

function sanitizeImage(file, cb) {
    // Define the allowed extension
    const fileExts = [".png", ".jpg", ".jpeg", ".gif"];

    // Check allowed extensions
    const isAllowedExt = fileExts.includes(
        path.extname(file.originalname.toLowerCase())
    );

    // Mime type must be an image
    const isAllowedMimeType = file.mimetype.startsWith("image/");

    if (isAllowedExt && isAllowedMimeType) {
        return cb(null, true); // no errors
    } else {
        // pass error msg to callback, which can be displaye in frontend
        cb("Error: File type not allowed!");
    }
}
function sanitizeFileCsv(file, cb) {
    // Define the allowed extension
    const fileExts = [".csv"];

    // Check allowed extensions
    const isAllowedExt = fileExts.includes(
        path.extname(file.originalname.toLowerCase())
    );

    // Mime type must be an image
    const isAllowedMimeType = file.mimetype.startsWith("application/vnd.ms-excel");

    if (isAllowedExt && isAllowedMimeType) {
        return cb(null, true); // no errors
    } else {
        // pass error msg to callback, which can be displaye in frontend
        cb("Error: File type not allowed!");
    }
}
function sanitizeFilePDF(file, cb) {
    // Define the allowed extension
    const fileExts = [".pdf"];

    // Check allowed extensions
    const isAllowedExt = fileExts.includes(
        path.extname(file.originalname.toLowerCase())
    );

    // Mime type must be an image
    const isAllowedMimeType = file.mimetype.startsWith("application/pdf");

    if (isAllowedExt && isAllowedMimeType) {
        return cb(null, true); // no errors
    } else {
        // pass error msg to callback, which can be displaye in frontend
        cb("Error: File type not allowed!");
    }
}
// our middleware
// const uploadImage = multer({
//     storage: s3Storage,
//     fileFilter: (req, file, callback) => {
//         sanitizeImage(file, callback)
//     },
//     limits: {
//         fileSize: 1024 * 1024 * 2 // 2mb file size
//     }
// })

function upload() {
    this.user = () => {
        return multer({
            storage: s3StorageUser,
            fileFilter: (req, file, callback) => {
                sanitizeImage(file, callback)
            },
            limits: {
                fileSize: 1024 * 1024 * 2 // 2mb file size
            }
        });
    }
    this.businessStamp = () => {
        return multer({
            storage: s3StorageStamp,
            fileFilter: (req, file, callback) => {
                sanitizeImage(file, callback)
            },
            limits: {
                fileSize: 1024 * 1024 * 2 // 2mb file size
            }
        });
    }

    this.businessLogo = () => {
        return multer({
            storage: s3StorageLogo,
            fileFilter: (req, file, callback) => {
                sanitizeImage(file, callback)
            },
            limits: {
                fileSize: 1024 * 1024 * 2 // 2mb file size
            }
        });
    }
    this.gallery = () => {
        return multer({
            storage: s3StorageGallery,
            fileFilter: (req, file, callback) => {
                sanitizeImage(file, callback)
            },
            limits: {
                fileSize: 1024 * 1024 * 2 // 2mb file size
            }
        });
    }

    this.userCsv = () => {
        return multer({
            storage: s3StorageCsv,
            fileFilter: (req, file, callback) => {
                sanitizeFileCsv(file, callback)
            },
            limits: {
                fileSize: 1024 * 1024 * 2 // 2mb file size
            }
        });
    }
    this.pdf = () => {
        return multer({
            storage: s3StorageFilePDF,
            fileFilter: (req, file, callback) => {
                sanitizeFilePDF(file, callback)
            },
            limits: {
                fileSize: 1024 * 1024 * 2 // 2mb file size
            }
        });
    }

};

module.exports = new upload();