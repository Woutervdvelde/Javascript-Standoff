const getSocketResponse = (socket, name) => {
    return new Promise((resolve, reject) => {
        socket.on(name, e => {
            resolve(e);
        });
    });
}
