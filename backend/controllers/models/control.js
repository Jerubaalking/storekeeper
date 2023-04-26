const Creates = require("./creates");
const FindBy = require("./findBy");
const Finds = require("./finds");
const Session = require("./session");
const Single = require("./single");
const Update = require("./updates");
const Delete = require("./deletes");
const Sum = require("./sum");
const FindCountBy = require("./findcountby");
const authorizers = require("../../../database/models/authorizers");
const roles = require("../../../database/models/roles");
/**
 * @class {Controllers} Controller used to extend session
 * used as a middleware between request and db query
 * Future use is to try to use it to carry out validation
 */
class Controllers extends Session {
    constructor(req) {
        super(req);
        this._session = this.getCurrentSession().then().catch(err => console.log(err))
    }
    async authorize(action) {
        // console.log(this._session);
        let sessionss = await this._session;
        let authorizer = await authorizers.findOne({ where: { title: action, businessId: await sessionss.businessId, sessionId: await sessionss.sessionId } });
        authorizer = JSON.parse(JSON.stringify(await authorizer));
        let role = await roles.findOne({ where: { id: sessionss.roleId } });
        role = JSON.parse(JSON.stringify(role));
        if (authorizer.accept.includes(role.role)) {
            return true;
        } else {
            return false
        }
    }
    async find() {
        return await new Finds(await this.getCurrentSession());
    }
    async findBy() {
        return await new FindBy(await this.getCurrentSession());
    }
    async findCountBy() {
        return await new FindCountBy(await this.getCurrentSession());
    }
    async single() {
        return await new Single(await this.getCurrentSession());
    }
    async create() {
        return await new Creates(await this.getCurrentSession());
    }
    async update() {
        return await new Update(await this.getCurrentSession());
    }
    async sum() {
        return await new Sum(await this.getCurrentSession());
    }
    async delete() {
        return await new Delete(await this.getCurrentSession());
    }
    async getParams(req) {
        console.log(await this._request.url);
        if (this._request.url.includes('?')) {
            let dataArray = await [...this._request.url.split('?')[1].split('&')];
            let data = {};
            dataArray.forEach(s => {
                data[s.split('=')[0]] = s.split('=')[1];
            });

            data = JSON.parse(JSON.stringify(await data));
            return data;
        }
    }

}

module.exports = Controllers;