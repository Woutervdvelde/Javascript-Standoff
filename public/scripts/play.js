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

    socket = io({ auth: { id: lobby.id, lastSocket: lastPlayerSocket, type: 'player' } });
    socket.on("connect_error", data => showConnectionError(data));
    socket.on("connect", connectionSuccess);
}

initializeLobby();