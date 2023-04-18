const express = require('express');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');

require('dotenv').config();

const configMorgan = require('./config/morgan');
const userRoute = require('./routes/v1');
const sequelize = require('./data/database-config');

const app = express();

app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}))

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

//Morgan configured
configMorgan(app);

// Register routes
app.use(userRoute);

sequelize.authenticate()
    .then(result => {
        app.listen(process.env.PORT || 81);
        console.log("CONNECTED !!");
        console.log(`Server started on PORT ${process.env.PORT || 81} :: ` + new Date());
    })
    .catch(err => console.error(err));