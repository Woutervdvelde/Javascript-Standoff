const getSocketResponse = (socket, name) => {
    return new Promise((resolve, reject) => {
        socket.on(name, e => {
            resolve(e);
        });
    });
}

const showToast = (message, seconds) => {
    const element = document.createElement('div');
    element.classList.add('toast');
    element.innerText = message;
    document.body.insertAdjacentElement('afterbegin', element);
    
    setTimeout(() => element.style.transform = "translateY(0)", 1);
    setTimeout(() => element.style.transform = "translateY(-100%)", (seconds - .5) * 1000);
    setTimeout(() => document.body.removeChild(element), seconds * 1000);
}
