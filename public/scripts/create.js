const input = document.getElementById("lobby_name");
const button = document.getElementById("create_button");
const errorElement = document.getElementById("error_message");

const socket = io('', {});

const displayError = (error) => {
    button.innerHTML = 'Create';
    button.disabled = false;
    errorElement.innerText = error;
}

const saveAndRedirectLobby = (data) => {
    localStorage.setItem('lastHostSocket', socket.id);
    localStorage.setItem('lobby', JSON.stringify(data));
    location.href = '/lobby.html';
}

const tryCreateLoby = async () => {
    errorElement.innerText = '';
    button.innerHTML = `<span class='material-symbols-rounded spin'>settings</span>`;
    button.disabled = true;

    socket.emit('create_lobby', input.value);
    const response = await getSocketResponse(socket, 'create_lobby_response');
    if (response.error)
        displayError(response.error);
    else
        saveAndRedirectLobby(response.data);
}

button.onclick = tryCreateLoby;