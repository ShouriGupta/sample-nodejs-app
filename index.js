const Hapi = require('hapi');
const server = new Hapi.Server();

var port = process.env.PORT || 1337;
// server.listen(port);

server.connection({ port: port, host: 'localhost' });

server.route({
    method: 'GET',
    path: '/hello',
    handler: function (request, reply) {
    	reply("Hello World")
    }
});

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});