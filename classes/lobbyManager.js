const Lobby = require("./lobby");
const Player = require("./player");

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

    getLobbyByPlayer(playerId) {
        return this.lobbies.find(l => l.players[playerId]);
    }

    getAllLobbiesResponse() {
        return this.lobbies.map(l => l.toResponse());
    }

    createLobby(lobbyName, lastHostSocket) {
        if (this.getLobbyByName(lobbyName)) return false;
        const lobby = new Lobby(lobbyName, lastHostSocket);
        this.lobbies.push(lobby);
        return lobby;
    }

    joinLobby(lobbyName, socket) {
        const lobby = this.getLobbyByName(lobbyName);
        if (!lobby || Object.keys(lobby.players).length >= 2)
            //returning empty lobby
            return { lobby: Lobby.Empty(), player: undefined };

        const player = new Player(socket.id);
        lobby.players[player.id] = player;

        return { lobby: lobby, player: player };
    }

    connectPlayer(playerId) {
        const lobby = this.getLobbyByPlayer(playerId);
        if (!lobby) return;

        const player = lobby.players[playerId];
        player.connected = true;
        clearTimeout(player.timeout);
    }

    disconnectPlayer(playerId) {
        const lobby = this.getLobbyByPlayer(playerId);
        if (!lobby) return;
            
        const player = lobby.players[playerId];
        player.connected = false;
        player.timeout = setTimeout(() => 
            this.removePlayer(playerId), 10 * 1000
        );
    }

    removePlayer(playerId) {
        const lobby = this.getLobbyByPlayer(playerId);
        if (!lobby || lobby.players[playerId].connected) return;

        delete lobby.players[playerId];
        return true;
    }
}