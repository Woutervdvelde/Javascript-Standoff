const input = document.getElementById("lobby_name");
const button = document.getElementById("create_button");
const errorElement = document.getElementById("error_message");

const socket = io('', {});

const getSocketResponse = (name) => {
    return new Promise((resolve, reject) => {
        socket.on(name, e => {
            resolve(e);
        });
    });
}

const displayError = (error) => {
    button.innerHTML = 'Create';
    button.disabled = false;
    errorElement.innerText = error;
}

const saveAndRedirectLobby = (data) => {

}

const tryCreateLoby = async () => {
    errorElement.innerText = '';
    button.innerHTML = `<span class='material-symbols-rounded spin'>settings</span>`;
    button.disabled = true;

    socket.emit('create_lobby', input.value);
    const response = await getSocketResponse('create_lobby_response');
    console.log(response);
    if (response.error)
        displayError(response.error);
    else
        saveAndRedirectLobby(response.data);
}

button.onclick = tryCreateLoby;