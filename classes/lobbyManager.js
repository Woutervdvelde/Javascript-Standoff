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
        return this.lobbies.find(l => {
            if (l.players[playerId]) return { lobby: l, player: player };
        }) ?? { lobby: undefined, player: undefined };
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
        if (!lobby || Object.keys(lobby.players).length >= 2) return false;
        const player = new Player(socket.id);
        lobby.players[player] = player;
        return lobby;
    }

    tryRemovePlayer(socketId) {
        const { lobby, player } = this.getLobbyByPlayer(socketId);
        console.log(lobby);
        if (!lobby || !player.connected) return false;

        lobby.players.splice(lobby.players.indexOf(player), 1);
        return true;
    }
}