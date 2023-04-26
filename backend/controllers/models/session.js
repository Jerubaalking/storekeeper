const businesses = require("../../../database/models/businesses");
const permissions = require("../../../database/models/permissions");
const roles = require("../../../database/models/roles");
const user_roles = require("../../../database/models/user_roles");
const { spawnJwtPayload } = require("../services/handlers");

class Session {
    #_session;
    constructor(req) {
        this._request = req;
        this.#_session = spawnJwtPayload(req.cookies._57or35, req.cookies.e5t_);
    }
    async getCurrentBusiness() {
        try {
            let business = await businesses.findOne({ where: { id: await this.#_session.businessId } })
            return JSON.parse(JSON.stringify(business));
        } catch (error) {
            console.log(error);
        }
    }
    async getUserRole() {
        try {
            let userRole = JSON.parse(JSON.stringify(await user_roles.findOne({ where: { userId: await this.#_session.userId, businessId: await this.#_session.businessId } })));

            let role = JSON.parse(JSON.stringify(await roles.findOne({ where: { id: await userRole.roleId }, include: { model: permissions } })));
            console.log(role);
            return [role.role];
        } catch (error) {
            console.log(error);
        }
    }
    async getUserPermissions() {
        try {

            let userRole = JSON.parse(JSON.stringify(await user_roles.findOne({ where: { userId: await this.#_session.userId, businessId: await this.#_session.businessId } })));

            let roles = JSON.parse(JSON.stringify(await roles.findOne({ where: { id: await userRole.roleId }, include: { model: permissions } })));
            let permits = [];
            for (const role of roles) {
                for (const permit of role.permissions) {
                    permits.push(permit.permission);
                }
            }
            console.log(permits);
            return permits;
        } catch (error) {
            console.log(error);
        }
    }

    async getCurrentBusinessId() {
        return this.#_session.businessId;
    }
    async getCurrentSession() {
        return this.#_session;
    }
}
module.exports = Session;