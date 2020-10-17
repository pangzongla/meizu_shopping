const JsonServer = require('json-server');
const data = require('./db.js');

const server = JsonServer.create();
const router = JsonServer.router(data);
const middleware = JsonServer.defaults();

server.use(middleware);
server.use(router);
server.use(JsonServer.bodyParser);

server.listen({
    host:'',
    port:'3000'
}, function (){
    console.log('json-server is running');
});
