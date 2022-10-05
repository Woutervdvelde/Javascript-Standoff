const container = document.querySelector('.container');
let lobby, socket;

const showConnectionError = () => {
    const template = document.getElementById('connection_error_template');
    const element = template.content.cloneNode(true);
    container.innerHTML = '';
    container.appendChild(element);
}

const connectionSuccess = () => {
    console.log("connected");
    localStorage.setItem('lastHostSocket', socket.id);
}

const initializeLobby = () => {
    lobby = JSON.parse(localStorage.getItem('lobby'));
    const lastHostSocket = localStorage.getItem('lastHostSocket');
    if (!lobby) location.href = '/create.html';

    socket = io({ auth: { id: lobby.id, lastHostSocket:  lastHostSocket} });
    socket.on("connect_error", showConnectionError);
    socket.on("connect", connectionSuccess);
}

initializeLobby();
