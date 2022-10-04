const Lobby = require("./lobby");

module.exports = class LobbyManager {
    lobbies = [];
    constructor() {}

    getLobbyByName(name) {
        return this.lobbies.find(l => l.name == name);
    }

    createLobby(lobby_name) {
        if (this.getLobbyByName(lobby_name)) return false;
        const lobby = new Lobby(lobby_name);
        this.addLobby(lobby);
        return lobby;
    }

    addLobby(lobby) {
        this.lobbies.push(lobby);
    }
}