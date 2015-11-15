'use strict';

var jackrabbit = require('jackrabbit');

const RABBIT_URL = process.env.CLOUDAMQP_URL;
var rabbit = jackrabbit(RABBIT_URL);
var exchange = rabbit.default();
var rpc = exchange.queue({ name: 'rpc_queue', prefetch: 1, durable: false });

const Hapi = require('hapi');
const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 8000
});

server.register(require('vision'), (err) => {
  server.views({
    engines: { html: require('handlebars') },
    relativeTo: __dirname,
    path: 'templates'
  });
});

server.route({
  method: 'GET',
  path:'/',
  handler: function(request, reply) {
    exchange.publish({ name: 'Nicolas' }, { key: 'rpc_queue', reply: function(data) {
      reply.view('index', { message: data.result });
    }});
  }
});

server.start((err) => {
  if (err) { throw err; }
  console.log('Server running at:', server.info.uri);
});
