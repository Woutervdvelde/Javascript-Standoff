module.exports = class Lobby {
    id; name; lastHostSocket; hostSocket; players;
    players = [];

    constructor(name, lastHostSocket) {
        this.id = `${Math.floor(Math.random() * 1000000)}${Date.now()}`;
        this.name = name;
        this.lastHostSocket = lastHostSocket;
        return this;
    }

    addPlayer(id) {
        this.players.push(id);
    }

    replacePlayer(oldId, newId) {
        this.players.splice(this.players.indexOf(oldId), 1, newId);
    }
}