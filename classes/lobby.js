module.exports = class Lobby {
    id; name;

    constructor(name) {
        this.id = `${Math.floor(Math.random() * 1000000)}${Date.now()}`;
        this.name = name;
        return this;
    }
}