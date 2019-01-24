const Hapi = require('hapi');
const server = new Hapi.Server();
server.connection({ port: 8080, host: 'localhost' });

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