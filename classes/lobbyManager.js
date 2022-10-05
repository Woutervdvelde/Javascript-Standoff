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

    createLobby(lobbyName, lastHostSocket) {
        if (this.getLobbyByName(lobbyName)) return false;
        const lobby = new Lobby(lobbyName, lastHostSocket);
        this.addLobby(lobby);
        return lobby;
    }

    addLobby(lobby) {
        this.lobbies.push(lobby);
    }
}