// import required packages
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const https = require('https');
const http = require('http');

const fs = require('fs');

// create new express app and save it as "app"
const app = express();
app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// create a route for the app
app.get('/', (req, res) => {
  console.log("Request received", req.headers)
  res.send('Hello dev.to!');
});

// another route
app.post('/service', (req, res) => {
    console.log("Request data - ", req.body, req.headers)
  res.status(200).send(req.body);
});

// another route
app.post('/success', (req, res) => {
  console.log("Request data Success - ", req.body, req.headers)
res.send(req.body);
});

// console.log("Server Key - ", fs.readFileSync('./server.key', { encoding: "utf-8" }))

// Listen both http & https ports
const httpServer = http.createServer(app);
const httpsServer = https.createServer({
  ca: fs.readFileSync('./ca-crt.pem', { encoding: "utf-8" }),
  key: fs.readFileSync('./server-key.pem', { encoding: "utf-8" }),
  cert: fs.readFileSync('./server-crt.pem', { encoding: "utf-8" }),
  requestCert: true, 
  rejectUnauthorized: true
}, app);

httpServer.listen(8000, () => {
    console.log('HTTP Server running on port 8000');
});

httpsServer.listen(4430, () => {
    console.log('HTTPS Server running on port 4430');
});