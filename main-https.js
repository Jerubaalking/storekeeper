const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const { engine } = require("express-handlebars");
const dotenv = require('dotenv');
const path = require('path');
const https = require('https');
var rootCas = require('ssl-root-cas');
const cookieParser = require("cookie-parser");

const cors = require('cors');
const app = express();

// Body parser

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

dotenv.config({ path: `./config/config.env` });
// app.use(cors());

app.use('/public', express.static(path.resolve(__dirname + '/public')));
app.set('view engine', 'hbs');
app.set('views', './views');

app.engine('hbs', engine({
    defaultLayout: 'layout',
    layoutsDir: 'views/layouts',
    partialsDir: __dirname + '/views/partials',
    helpers: require('./backend/helpers/handle_bar').helpers,
    registerPartial: "home",
    extname: '.hbs',
    registerPartial: 'settings'
}));
// const r = require('./backend/controllers/services/requestHandler');
// app.use('/church', r);
let routeManager = require('./routeManager');
routeManager(app);


const port = process.env.PORT;
const _env = process.env.NODE_ENV;
const corsOptions = {
    //To allow requests from client
    origin: [
        `http://localhost:${port}`,
        "http://127.0.0.1",
        `https://localhost:${port}`,
        "https://127.0.0.1:5006",
    ],
    credentials: true,
    exposedHeaders: ["set-cookie"],
};

// app.use(cors(corsOptions));

const httpsOptions = {
    key: fs.readFileSync('./security/localhost+1-key.pem'),
    cert: fs.readFileSync('./security/localhost+1.pem'),
    ca: [fs.readFileSync('./security/localhost+1-key.pem'), fs.readFileSync('./security/localhost+1.pem'),
    ],
    agent: new https.Agent({
        key: fs.readFileSync('./security/localhost+1-key.pem'),
        cert: fs.readFileSync('./security/localhost+1.pem'),
    }),
    requestCert: false,
    rejectUnauthorized: false
};

https.globalAgent.options.ca = __dirname + '/security';
https.globalAgent.options.key = fs.readFileSync('./security/localhost+1-key.pem');
https.globalAgent.options.cert = fs.readFileSync('./security/localhost+1.pem');
const server = https.createServer(httpsOptions, app)
    .listen(port, () => {
        console.log(`server running in ${_env} mode on port ${port}`);
    });
