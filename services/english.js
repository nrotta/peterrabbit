'use strict';

var jackrabbit = require('jackrabbit');

const RABBIT_URL = 'amqp://ymqgotlg:tRp9hfCkw2wFF1wPTdqkljgZLq43j2qi@moose.rmq.cloudamqp.com/ymqgotlg';
var rabbit = jackrabbit(RABBIT_URL);
var exchange = rabbit.default();
var rpc = exchange.queue({ name: 'rpc_queue', prefetch: 1, durable: false });

console.log('English service running');

rpc.consume(onRequest);

function onRequest(data, reply) {
  console.log('Request received');
  var greet = 'Hello ' + data.name
  reply({ result: greet });  
}
