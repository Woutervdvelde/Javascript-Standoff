module.exports = class Lobby {
    hostSocket;

    constructor(name, lastHostSocket) {
        this.id = `${Math.floor(Math.random() * 1000000)}${Date.now()}`;
        this.name = name;
        this.lastHostSocket = lastHostSocket;
        this.players = {};
    }

    changePlayerSocket(oldSocketId, newSocketId) {
        this.players.splice(this.players.indexOf(oldSocket), 1, newSocket);
    }

    //used to remove sensitive information for end user
    toResponse() {
        return { id: this.id, name: this.name, players: this.players.map(p => 'player') };
    }
}