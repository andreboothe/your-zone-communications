const htttp = require("http");
const app = require("./app");

const port = process.env.PORT || 5000;

const server = htttp.createServer(app);

server.listen(port);
