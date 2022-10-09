let lobby, socket;


const showConnectionError = (data) => {
    console.log(data);
    location.href = "/join.html";
}

const connectionSuccess = () => {
    console.log("connected");
    localStorage.setItem('lastPlayerSocket', socket.id);
}

const initializeLobby = () => {
    lobby = JSON.parse(localStorage.getItem('lobby'));
    if (!lobby) location.href = "/join.html";

    const lastPlayerSocket = localStorage.getItem('lastPlayerSocket');
    const playerId = localStorage.getItem("playerId");

    socket = io({
        auth: {
            type: 'player',
            id: lobby.id,
            lastSocket: lastPlayerSocket,
            playerId: playerId
        }
    });
    socket.on("connect_error", data => showConnectionError(data));
    socket.on("connect", connectionSuccess);
}

initializeLobby();