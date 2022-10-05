module.exports = class Lobby {
    id; name; lastHostSocket; hostSocket;

    constructor(name, lastHostSocket) {
        this.id = `${Math.floor(Math.random() * 1000000)}${Date.now()}`;
        this.name = name;
        this.lastHostSocket = lastHostSocket;
        return this;
    }
}