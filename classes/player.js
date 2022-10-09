module.exports = class Player {
    constructor(id) {
        this.id = this._generateId();
        this.socketId = id;
        this.connected = false;
        this.timeout = null;
    }

    _generateId() {
        return `${Date.now()}${Math.floor(Math.random() * 100000)}`;
    }
}