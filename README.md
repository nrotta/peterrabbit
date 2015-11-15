##Get An Account (or run RabbitMQ locally)##

Go to https://www.cloudamqp.com/ and create an account.

Get the *URL* showed on **CloudAMQP Console** (format: amqp://user:password@server/user)

Login, go to the management interface and create a queue named **rpc_queue**.



##Run It##
```
git clone https://github.com/nrotta/peterrabbit.git
cd peterrabbit
npm install

# use the URL from above
export CLOUDAMQP_URL=amqp://user:password@server/user

# run in different console tabs
node services/english.js
node services/italian.js
node index.js
```

Go to [http://localhost:8000/](http://localhost:8000/) (refresh the page to be served by the different services)
