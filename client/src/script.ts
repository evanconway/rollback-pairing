import { Peer } from "peerjs";

let conn;

const peerId = `${Math.floor(Math.random() * 2 ** 18).toString(36).padStart(4, 0)}`;

const peer = new Peer(peerId,
    {
      host: location.hostname,
      debug: 1,
      path: "/myapp",
    },
);

document.getElementById('chatbox-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const chatTextInput = document.getElementById('chatbox-textinput');
    const pNode = document.createElement('p');
    const message = chatTextInput.value;
    pNode.innerHTML = message;
    pNode.style.backgroundColor = 'white';
    document.getElementById('chatbox')?.appendChild(pNode);
    chatTextInput.value = '';
    
    if (conn.open) {
        conn.send(message);
    }
});

peer.on("open", () => {
    window.caststatus.textContent = `Your device ID is: ${peer.id}`;
});

const setupConnection = (conn) => {
    conn.on('data', (d) => {
        console.log('data:', d);
        const pNode = document.createElement('p');
        pNode.innerHTML = d;
        pNode.style.backgroundColor = 'yellow';
        document.getElementById('chatbox')?.appendChild(pNode);
    });
};

// click event for call button
document.querySelector(".call-btn").addEventListener("click", () => {
    const code = window.prompt("Please enter the sharing code");
    conn = peer.connect(code);
    setupConnection(conn);
});

peer.on("connection", (connection) => {
    conn = connection;
    setupConnection(conn);
});