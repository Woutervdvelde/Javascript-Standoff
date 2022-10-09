module.exports = class Lobby {
    hostSocket;

    constructor(name, lastHostSocket) {
        this.id = this._generateId();
        this.name = name;
        this.lastHostSocket = lastHostSocket;
        this.players = {};
    }

    _generateId() {
        return `${Date.now()}${Math.floor(Math.random() * 100000)}`;
    }

    static Empty() {
        const response = new this();
        response.id = undefined;
        return response;
    }

    changePlayerSocket(oldSocketId, newSocketId) {
        this.players.splice(this.players.indexOf(oldSocket), 1, newSocket);
    }

    //used to remove sensitive information for end user
    toResponse() {
        return { id: this.id, name: this.name, players: Object.keys(this.players).map(p => 'player') };
    }
}