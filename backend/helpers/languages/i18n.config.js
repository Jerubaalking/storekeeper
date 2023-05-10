const i18n = require('i18n');
const path = require('path');
const fs = require('fs');
const translations = require('../../../database/models/transalations');
const languages = require('../../../database/models/languages');
// const translations = require('./models/translations'); /
// tra// path to your translations model

i18n.configure({
    locales: ['sw', 'en'],
    defaultLocale: 'sw',
    queryParameter: 'lang',
    directory: './backend/helpers/languages/',
    api: {
        "_": 'translate',
        "_n": 'translateN',
    },
});
let translatePath = path.resolve(path.basename('/') + '/backend/helpers/languages/');

// Custom translation function using Sequelize
() => {
    locale = i18n.getLocale();
    console.log('locale', locale);
    languages.findOne({ where: { abbreviation: locale } }).then(lang => {
        lang = JSON.parse(JSON.stringify(lang));
        console.log('found language.....:', lang);
        translations.findOne({
            where: {
                languageId: lang.id,
                phrase: key,
            },
        }).then(dif => {
            if (!dif) {
                translations.create({
                    phrase: key,
                    translation: key, // You can set a default value if needed
                    languageId: lang.id,
                }).then(newTranslation => {
                    return newTranslation.translation
                }).catch(err => {
                    console.log(err);
                });
            }
            let translation = JSON.parse(JSON.stringify(dif));
            console.log('found translation.....:', translation);
            let filedata = JSON.parse(JSON.stringify(fs.readFileSync(translatePath + locale).toString()));
            filedata[key] = translation.translation;
            fs.writeFileSync(translatePath + locale, JSON.stringify(filedata));
        }).catch(err => {
            console.log(err);
        });
    }).catch(err => {
        console.log(err);
    });
};

// Override the translate function in i18n

// Save the translation to the database
const savetranslationsToDatabase = async (key, locale, value) => {
    let lang = JSON.parse(JSON.stringify(await languages.findOne({ where: { abbreviation: locale } })));
    let translation = await translations.findOne({
        where: {
            languageId: await lang.id,
            phrase: key,
        },
    });

    if (translation) {
        // If translation already exists, update its value
        translation.value = value;
        await translation.save();
    } else {
        // If translation doesn't exist, create a new entry
        translation = await translations.create({
            phrase: key,
            translation: value,
            languageId: lang.id,
        });
    }
};


module.exports = i18n;
