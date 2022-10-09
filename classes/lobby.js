module.exports = class Lobby {
    hostSocket;

    constructor(name, lastHostSocket) {
        this.id = `${Math.floor(Math.random() * 1000000)}${Date.now()}`;
        this.name = name;
        this.lastHostSocket = lastHostSocket;
        this.players = [];
    }

    changePlayerSocket(oldSocket, newSocket) {
        if (!this.players.includes(oldSocket)) return;
        this.players.splice(this.players.indexOf(oldSocket), 1, newSocket);
    }
}