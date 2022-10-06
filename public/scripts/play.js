let lobby, socket;


const showConnectionError = (e) => {
    console.log(e);
    // location.href = "/join.html";
}

const connectionSuccess = () => {
    console.log("connected");
    localStorage.setItem('lastPlayerSocket', socket.id);
}

const initializeLobby = () => {
    lobby = JSON.parse(localStorage.getItem('lobby'));
    if (!lobby) location.href = "/join.html";

    const lastPlayerSocket = localStorage.getItem('lastPlayerSocket');
    socket = io({ auth: { id: lobby.id, type: 'player', lastPlayerSocket: lastPlayerSocket } });
    socket.on("connect_error", showConnectionError);
    socket.on("connect", connectionSuccess);
}

initializeLobby();