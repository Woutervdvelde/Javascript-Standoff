const reloadButton = document.getElementById("reload");
const lobbyContainer = document.getElementById("lobby_container");
const lobbyTemplate = document.getElementById("lobby_template");
const socket = io();

const addLobby = (name, participants) => {
    const element = document.createElement('div');
    element.appendChild(lobbyTemplate.content.cloneNode(true));
    element.querySelector(".lobby-name").innerHTML = name;
    element.querySelector(".lobby-participants").innerHTML = `${participants}|2`;
    element.children[0].onclick = () => tryJoinLobby(name);
    lobbyContainer.appendChild(element.children[0]);
}

const tryJoinLobby = (name) => {
    socket.emit('join', name);
}

const loadLobbies = async () => {
    socket.emit('get_lobbies');
    const lobbies = await getSocketResponse(socket, 'get_lobbies_response');
    lobbyContainer.innerHTML = '';
    lobbies.forEach(lobby => addLobby(lobby.name, lobby.players.length));
}




setInterval(loadLobbies, 10 * 1000);
reloadButton.onclick = loadLobbies;
loadLobbies();