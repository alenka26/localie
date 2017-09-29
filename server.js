'use strict';

const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');

// Create a server with a host and port
const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    }
});

server.connection({
    host: '0.0.0.0',
    port: 8000
});

server.register(Inert, () => {});

// Add the route
server.route({
    method: 'GET',
    path:'/',
    handler: function (request, reply) {

        return reply.file('index.html');
    }
});

server.route({
    method: 'GET',
    path:'/api',
    handler: function (request, reply) {

        return reply('{"text": "foo"}');
    }
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
