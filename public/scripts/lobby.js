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
    const l = JSON.parse(localStorage.getItem('lobby'));
    const lastHostSocket = localStorage.getItem('lastHostSocket');
    if (!l) location.href = '/create.html';

    socket = io({ auth: { id: l.id, lastHostSocket:  lastHostSocket} });
    socket.on("connect_error", showConnectionError);
    socket.on("connect", connectionSuccess);
}

initializeLobby();
