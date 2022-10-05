module.exports = class Lobby {
    id; name; lastHostSocket; hostSocket; players;

    constructor(name, lastHostSocket) {
        this.id = `${Math.floor(Math.random() * 1000000)}${Date.now()}`;
        this.name = name;
        this.lastHostSocket = lastHostSocket;
        this.players = [];
        return this;
    }
}