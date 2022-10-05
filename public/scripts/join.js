const reloadButton = document.getElementById("reload");
const lobbyContainer = document.getElementById("lobby_container");
const lobbyTemplate = document.getElementById("lobby_template");
const socket = io();

const addLobby = (name, players) => {
    const element = document.createElement('div');
    element.appendChild(lobbyTemplate.content.cloneNode(true));
    element.querySelector(".lobby-name").innerHTML = name;
    element.querySelector(".lobby-players").innerHTML = `${players}|2`;
    element.children[0].onclick = () => tryJoinLobby(name);
    lobbyContainer.appendChild(element.children[0]);
}

const loadLobbies = async () => {
    socket.emit('get_lobbies');
    const lobbies = await getSocketResponse(socket, 'get_lobbies_response');
    lobbyContainer.innerHTML = '';
    if (lobbies.length)
        lobbies.forEach(lobby => addLobby(lobby.name, lobby.players.length));
    else
        lobbyContainer.innerHTML = '<h1 class="no-lobbies-message">0 lobbies</h1>';
}

const denyLobbyJoin = () => {
    loadLobbies();
    showToast("An error occured while joining the lobby", 5);
}

const transferToLobby = (lobby) => {
    localStorage.setItem('lobby', JSON.stringify(lobby));
    location.href = './lobby.html';
}

const tryJoinLobby = async (name) => {
    socket.emit('join_lobby', name);
    const response = await getSocketResponse(socket, 'join_lobby_response');
    if (!response) denyLobbyJoin();
    else transferToLobby(response);
}


setInterval(loadLobbies, 10 * 1000);
reloadButton.onclick = loadLobbies;
loadLobbies();