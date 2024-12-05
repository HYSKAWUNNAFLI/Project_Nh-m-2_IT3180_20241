const express = require('express')
const router = express.Router();
const defaultRouters = require("./defaultRouters");
const productRouters = require("./productRouters");
const usersRouters = require("./usersRoutes");
const cartRouters = require("./cartRoutes");


module.exports = (app) => {
    app.use("/", defaultRouters);
    app.use("/product", productRouters);
    app.use("/account", usersRouters);
    app.use("/cart",cartRouters);


}
    // app.use("/cart", cartRouters);
    
