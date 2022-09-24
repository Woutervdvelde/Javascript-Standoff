const express = require('express');
const https = require('https');
const selfsigned = require('selfsigned');

const app = express();
const port = 443;

const pems = selfsigned.generate(null, { clientCertificate: true });
const credentials = { key: pems.private, cert: pems.cert };

app.use(express.static('public'));
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port);