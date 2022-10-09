const Lobby = require("./lobby");

module.exports = class LobbyManager {
    constructor() {
        this.lobbies = [];
    }

    getLobbyByName(name) {
        return this.lobbies.find(l => l.name == name);
    }

    getLobbyById(id) {
        return this.lobbies.find(l => l.id == id);
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
        lobby.players.push(socket.id);
        return lobby;
    }
}