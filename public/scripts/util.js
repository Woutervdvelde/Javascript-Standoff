const getSocketResponse = (socket, name) => {
    return new Promise((resolve, reject) => {
        socket.on(name, e => {
            resolve(e);
        });
    });
}

const showToast = (message, seconds = 5) => {
    const element = document.createElement('div');
    element.classList.add('toast');
    element.innerText = message;
    document.body.insertAdjacentElement('afterbegin', element);
    
    setTimeout(() => element.style.transform = "translateY(0)", 0);
    setTimeout(() => element.style.transform = "translateY(-100%)", (seconds - 1) * 1000);
    setTimeout(() => document.body.removeChild(element), seconds * 1000);
}
