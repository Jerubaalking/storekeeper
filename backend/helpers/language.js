const fs = require('fs');
const path = require('path');
var languageFolder_path = path.resolve("/backend/helpers/languages");
var codes_path = languageFolder_path + "/codes.json";
// console.log(languageFolder_path);

const addLang = (code, language) => {

    var lang_code = fs.readFileSync(codes_path, { encoding: "ascii" });
    // var langs = JSON.parse(lang_code);
    var languagesJson = JSON.parse(lang_code);
    languagesJson[code] = language;
    var jsonLang = JSON.stringify(languagesJson);
    // console.log(jsonLang.toString());
    var write = false;
    try {

        fs.writeFileSync(codes_path, jsonLang.toString(), (err) => {
            if (err) {

                return false;
            }
            return true;
        });
        write = true;
        return write;
    } catch (err) {
        return write;
    }
};
const byCode = (code = "en" || new String()) => {
    var t = code;
    if (fs.existsSync(codes_path)) {

        var languages = fs.readFileSync(codes_path, { encoding: "ascii" }, (err) => {
            return err;
        });
        var languagesJson = JSON.parse(languages);
        if (languagesJson[t] == undefined) {
            return false;
        }
        return languagesJson[t].toString();
    } else {
        return false;
    }
};

const setLang = (code) => {
    if (fs.existsSync(codes_path)) {

        var languages = fs.readFileSync(codes_path, { encoding: "ascii" }, (err) => {
            return err;
        });
        var languagesJson = JSON.parse(languages);
        languagesJson['selected'] = code;
        var json = JSON.stringify(languagesJson);
        fs.writeFileSync(codes_path, json);
        var languagesData = fs.readFileSync(codes_path, { encoding: "ascii" }, (err) => {
            return err;
        });

        var languagesJsonData = JSON.parse(languagesData);
        if (languagesJsonData[code] == undefined) {
            // add language the issue is to get the meaning of the code
            return false;
        }
        // console.log(languagesJsonData[code]);
        return languagesJsonData[code].toString();
    } else {
        return false;
    }
}
const selectedLang = (code) => {
    if (fs.existsSync(codes_path)) {

        var languages = fs.readFileSync(codes_path, { encoding: "ascii" }, (err) => {
            return err;
        });
        var languagesJson = JSON.parse(languages);
        return languagesJson['selected'].toString();
    } else {
        return false;
    }
}


var getLanguage = (code = "en" || new String()) => {
    if (byCode()) {
        var langJsonFilePath = `${languageFolder_path}/${byCode(code)}.json`;
        var fileExists = fs.existsSync(langJsonFilePath);
        if (fileExists != true) {
            //append to write file if it dont exist it creates it and write.
            var data = new String();
            var lang_code = fs.readFileSync(codes_path, { encoding: "ascii" });
            var langs = JSON.parse(lang_code);
            // var t =langs.map(item, item);
            // console.log(langs);
            var data = {
                language: "language"
            }
            var json = JSON.stringify(data);
            fs.appendFileSync(langJsonFilePath, json.toString(), (err) => {
                if (err) {
                    return false;
                }
                return true;
            });

            var language = fs.readFileSync(langJsonFilePath, { encoding: "ascii" }, (err) => {
                return err;
            });
            var languageJson = JSON.parse(language);
            return languageJson;
        } else {
            //open the file and read it

            var language = fs.readFileSync(langJsonFilePath, { encoding: "ascii" }, (err) => {
                return err;
            });
            var languageJson = JSON.parse(language);
            // console.log("outside if Language::", languageJson);
            return languageJson;
            // return fs.readFileSync(langJsonFilePath, { encoding: "ascii" });

        }
    } else {
        let jsonEmpty = {
            code: 'No language'
        }
        // console.log(jsonEmpty);
        return jsonEmpty;
    }


    // return langJsonFilePath;
};

const addPhrase = (code = "en" || new String(), phrase) => {

    var langJsonFilePath = `${languageFolder_path}/${byCode(code)}.json`;
    var fileExists = fs.existsSync(langJsonFilePath);
    if (fileExists != true) {
        //append to write file if it dont exist it creates it and write.
        var data = new String();
        var lang_code = fs.readFileSync(codes_path, { encoding: "ascii" });
        var langs = JSON.parse(lang_code);
        // var t =langs.map(item, item);
        var data = {
            language: "language"
        }
        data[phrase] = phrase;
        var json = JSON.stringify(data);
        fs.writeFileSync(langJsonFilePath, json.toString(), (err) => {
            if (err) {
                return false;
            }
            return true;
        });

        var language = fs.readFileSync(langJsonFilePath, { encoding: "ascii" }, (err) => {
            return err;
        });
        var languageJson = JSON.parse(language);
        return languageJson;
    } else {
        //open the file and read it

        var language = fs.readFileSync(langJsonFilePath, { encoding: "ascii" }, (err) => {
            return err;
        });
        // if the json file happens to be empty then check
        if (language) {
            var languageJson = JSON.parse(language);
            languageJson[phrase] = phrase;
            // console.log(languageJson);
        } else {
            var languageJson = {};
            languageJson[phrase] = phrase;
        }

        var json = JSON.stringify(languageJson);
        fs.writeFileSync(langJsonFilePath, json.toString(), (err) => {
            if (err) {
                return false;
            }
            return true;
        });
        // console.log(languageJson);
        return languageJson;

    }

    // return langJsonFilePath;
};

const translate = (code, phrase) => {
    // selected language should be in session
    let d = getLanguage(code);
    // console.log("d::", d[phrase], phrase);
    if (d[phrase] != undefined) {
        var stringPhrase = new String();
        stringPhrase = d[phrase];
        var fstring = stringPhrase.charAt(0).toLocaleUpperCase();
        var theRest = stringPhrase.slice(1, ((stringPhrase.length)));

        var fullPhrase = fstring.concat(theRest);
        // console.log(fullPhrase);
        return fullPhrase;
    } else {
        let p = addPhrase(code, phrase)
        // console.log("PP:: ", p);
        if (p) {
            // console.log("PP:: ", p);
            d = getLanguage(code);

            var stringPhrase = new String();
            stringPhrase = d[phrase];
            var fstring = stringPhrase.charAt(0).toLocaleUpperCase();
            var theRest = stringPhrase.slice(1, ((stringPhrase.length)));

            var fullPhrase = fstring.concat(theRest);
            // console.log(fullPhrase);
            return fullPhrase;
        }
    }
};
const phrase = (code, phrase) => {
    return translate(code, phrase);
}
// translate('sw', "login").then((word)=>{
//     console.log(word);
// }).catch((err)=>{
//     console.log(err);
// });

module.exports = { addLang, byCode, setLang, selectedLang, addPhrase, translate, phrase }
