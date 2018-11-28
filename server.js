var StaticServer = require('static-server');


var server = new StaticServer({
    rootPath: './public/dist/',
    port: 3000
});

server.start(function () {
    console.log('server starter on port ' + server.port);
})