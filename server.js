const LobbyManager = require('./classes/lobbyManager');

const express = require('express');
const https = require('https');
const selfsigned = require('selfsigned');
const { Server } = require('socket.io');

//HTTPS SERVER
const app = express();
const port = 443;
app.use(express.static('public'));

const pems = selfsigned.generate(null, { clientCertificate: true });
const credentials = { key: pems.private, cert: pems.cert };

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(port, () => console.log(`server hosted on port ${port}`));

const lobbyManager = new LobbyManager();
const io = new Server(httpsServer);

//MIDDLEWARE
io.use((socket, next) => {
    //verify lobby host
    const auth = socket.handshake.auth;
    if (Object.keys(auth).length) {
        const lobby = lobbyManager.getLobbyById(auth.id);
        if (!lobby) next(new Error('Incorrect lobby'));

        if (auth.type == 'host')
            if (lobby.lastHostSocket != auth.lastSocket)
                next(new Error("Not authorized as host"));
            else
                lobby.lastHostSocket = socket.id;

        if (auth.type == 'player')
            if (!lobby.players.includes(auth.lastSocket))
                next(new Error("Not authorized as player"));
            else
                lobby.changePlayerSocket(auth.lastSocket, socket.id);
    }
    next();
});

//CONNECTION METHODS
const createLobby = (socket, lobbyName) => {
    const lobby = lobbyManager.createLobby(lobbyName, socket.id);
    if (lobby)
        socket.emit('create_lobby_response', { data: lobby });
    else
        socket.emit('create_lobby_response', { error: "Lobby name is already in use" });
}

const returnAllLobbies = (socket) => {
    socket.emit('get_lobbies_response', lobbyManager.lobbies);
}

const joinLobby = (socket, lobbyName) => {
    const lobby = lobbyManager.joinLobby(lobbyName, socket);
    socket.emit('join_lobby_response', lobby);
}

//SOCKET.IO CONNECTION
io.on('connection', socket => {
    console.log(`${socket.id} connected`);

    socket.on('create_lobby', d => createLobby(socket, d));
    socket.on('get_lobbies', d => returnAllLobbies(socket));
    socket.on('join_lobby', d => joinLobby(socket, d));

    socket.on('disconnect', _ => {
        console.log(`${socket.id} disconnected`);
    });
});
