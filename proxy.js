var proxy = require('express-http-proxy');
var app = require('express')();
//fix ssl localhost
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.use('/', proxy('https://localhost:4430/'));
app.listen(3100, () => {
    console.log("Proxy server started");
});