const LobbyManager = require('./classes/lobbyManager');

const express = require('express');
const https = require('https');
const selfsigned = require('selfsigned');
const { Server } = require('socket.io');

const app = express();
const port = 443;
app.use(express.static('public'));

const pems = selfsigned.generate(null, { clientCertificate: true });
const credentials = { key: pems.private, cert: pems.cert };

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(port, () => console.log(`server hosted on port ${port}`));

const lobbyManager = new LobbyManager();

const io = new Server(httpsServer);
io.on('connection', socket => {
    console.log(`${socket.id} connected`);

    socket.on('create_lobby', lobby_name => {
        const lobby = lobbyManager.createLobby(lobby_name);
        if (lobby)
            socket.emit('create_lobby_response', { data: { id: lobby.id } });
        else
            socket.emit('create_lobby_response', { error: "Lobby name is already in use" });
        console.log(lobbyManager);
    });

    socket.on('disconnect', _ => {
        console.log(`${socket.id} disconnected`);
    });
});
