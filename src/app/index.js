const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const useRoutes = require("../router");
const errorHandler = require("./error-handle");
const cors = require("koa-cors");

const app = new Koa();

app.useRoutes = useRoutes;

app.use(bodyParser());
app.use(cors());
app.useRoutes();
app.on("error", errorHandler);

module.exports = app;
