const express = require('express');
const userRoutes = require('./userRoute');

const router = express.Router();

const routes = [{
    path: '/',
    route: userRoutes
}];

routes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;