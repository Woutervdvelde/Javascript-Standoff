const Lobby = require("./lobby");

module.exports = class LobbyManager {
    lobbies = [];
    constructor() {}

    getLobbyByName(name) {
        return this.lobbies.find(l => l.name == name);
    }

    getLobbyById(id) {
        return this.lobbies.find(l => l.id == id);
    }

    getLobbyByPlayer(socketId) {
        return this.lobbies.find(l => l.players.includes(socketId));
    }

    createLobby(lobbyName, lastHostSocket) {
        if (this.getLobbyByName(lobbyName)) return false;
        const lobby = new Lobby(lobbyName, lastHostSocket);
        this.lobbies.push(lobby);
        return lobby;
    }

    joinLobby(lobbyName, socket) {
        const lobby = this.getLobbyByName(lobbyName);
        if (!lobby || lobby.players.length >= 2) return false;
        lobby.addPlayer(socket.id);
        console.log('joined lobby, new lobby structure:');
        console.log(lobby)
        return lobby;
    }

    tryRemovePlayer(socketId) {
        const lobby = this.getLobbyByPlayer(socketId);
        if (!lobby) return;
        lobby.players.splice(lobby.players.indexOf(socketId), 1);
    }
}