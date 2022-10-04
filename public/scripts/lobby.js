let lobby, socket;

const showConnectionError = () => {
    const template = document.getElementById('connection_error_template');
    const element = template.content.cloneNode(true);
    document.body.appendChild(element);
}

const initializeLobby = () => {
    const l = JSON.parse(localStorage.getItem('lobby'));
    if (!l) location.href = '/create.html';

    socket = io({ auth: { id: l.id } });
    socket.on("connect_error", e => showConnectionError());
}
