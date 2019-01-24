const Hapi = require('hapi');
const server = new Hapi.Server();

var port = process.env.PORT || 1337;
// server.listen(port);

server.connection({ port: port, host: 'localhost' });

server.route({
    method: 'GET',
    path: '/hello',
    handler: function (request, reply) {
        let int = Math.floor(Math.random() * 5 * 1000);
        setTimeout(() => {
            reply("Hello World " + int/1000);
        }, int);
    }
});

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});