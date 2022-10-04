module.exports = class Lobby {
    id; name; lastHostId; hostSocket;

    constructor(name) {
        this.id = `${Math.floor(Math.random() * 1000000)}${Date.now()}`;
        this.name = name;
        return this;
    }
}