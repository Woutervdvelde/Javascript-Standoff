let lobby, socket;


const showConnectionError = () => {
    console.log('error')
    location.href = "/join.html";
}

const connectionSuccess = () => {
    console.log("connected");
}

const initializeLobby = () => {
    lobby = JSON.parse(localStorage.getItem('lobby'));
    if (!lobby) location.href = "/join.html";

    socket = io({ auth: { id: lobby.id } });
    socket.on("connect_error", showConnectionError);
    socket.on("connect", connectionSuccess);
}

initializeLobby();