const jwt = require("jsonwebtoken");
const businesses = require("../../../database/models/businesses");
const findby = require("../models/findBy");


const jwtExpirySeconds = 30;
const spawnJwtToken = async (data, salt, lifeInSeconds) => {
    return jwt.sign(data, salt, {
        algorithm: "HS256",
        expiresIn: lifeInSeconds,
    });
}
const spawnJwtPayload = async (token, est_) => {
    try {
        // Parse the JWT string and store the result in `payload`.
        // Note that we are passing the key in this method as well. This method will throw an error
        // if the token is invalid (if it has expired according to the expiry time we set on sign in),
        // or if the signature does not match
        return await jwt.verify(token, est_);
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            // if the error thrown is because the JWT is unauthorized, return a 401 error
            console.log("at catch:");
            return [false, e];
        }
    }
}

const signIn = async (req, res) => {
    // Get credentials from JSON body
    const { username, password } = req.body;
    let user = JSON.parse(JSON.stringify(await findby.user({ where: { email: username }, include: { model: businesses } })));
    console.log('user: ', user[0]);
    const userr = user[0];
    const { email, businessId, id, role, phone } = user[0];
    // if (!username || !password || user[username] !== password) {
    // 	// return 401 error is username or password doesn't exist, or if password does
    // 	// not match the password in our records
    // 	return res.status(401).end()
    // }
    if (!email) {
        // user dont exist
    }

    // Create a new token with the username in the payload
    // and which expires 300 seconds after issue
    const token = jwt.sign({ email, businessId, id, role, phone }, jwtKey, {
        algorithm: "HS256",
        expiresIn: jwtExpirySeconds,
    });
    console.log("token:", token)

    // set the cookie as the token string, with a similar max age as the token
    // here, the max age is in milliseconds, so we multiply by 1000
    res.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 })
    res.end();
}
const isLoggedIn = async (req, res, next) => {
    // We can obtain the session token from the requests cookies, which come with every request
    const token = req.cookies._57or35
    const salt = req.cookies.e5t_
    // if the cookie is not set, return an unauthorized error
    if (!token) {
        // redirect to login
        return res.redirect('/auth/signin');
    } else {
        try {
            let payload = await spawnJwtPayload(token, salt);
            console.log("payload: ", payload);
            req.body['userId'] = payload.userId;
            req.body['businessId'] = payload.businessId;
            req.body['sessionId'] = payload.sessionId;

            next()
        } catch (err) {superadmin
            return res.redirect('/auth/signin');
        }
    }


    // Finally, return the welcome message to the user, along with their
    // username given in the token
    // res.send(`Welcome ${payload.username}!`)
}
const refresh = (req, res, next) => {
    // (BEGIN) The code uptil this point is the same as the first part of the `welcome` routes
    const jwtKey = req.cookies.e5t_;

    const token = req.cookies._57or35;

    if (!token) {
        return res.status(401).end()
    }

    var payload
    try {
        payload = jwt.verify(token, jwtKey)
    } catch (e) {
        console.log(e);
        if (e instanceof jwt.JsonWebTokenError) {
            console.log("am here", e);
            return res.status(401).end()
        }
        console.log("am here", e);
        // return res.status(400).end()
    }
    // (END) The code uptil this point is the same as the first part of the `welcome` route

    // We ensure that a new token is not issued until enough time has elapsed
    // In this case, a new token will only be issued if the old token is within
    // 30 seconds of expiry. Otherwise, return a bad request status
    const nowUnixSeconds = Math.round(Number(new Date()) / 1000)
    if (payload.exp - nowUnixSeconds > 30) {
        return res.status(400).end()
    }

    // Now, create a new token for the current user, with a renewed expiration time
    const newToken = jwt.sign({ username: payload.username, church_id: req.params.id }, jwtKey, {
        algorithm: "HS256",
        expiresIn: jwtExpirySeconds,
    })

    // Set the new token as the users `token` cookie
    res.cookie("_57or35", newToken, { maxAge: jwtExpirySeconds * 1000 })
    next();
}

module.exports = { signIn, isLoggedIn, spawnJwtPayload, refresh, spawnJwtToken }