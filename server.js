const { generateCert } = require('./security/certificate');
const express = require('express');
const https = require('https');
const app = express();
const port = 80;

app.use(express.static('public'));

// const httpsServer = https.createServer(options, app);
// httpsServer.listen(port)
generateCert();
app.listen(port, () => {});