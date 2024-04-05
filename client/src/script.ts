import { Peer, DataConnection } from "peerjs";
import { amPlayer1, setPlayer, setPlayerMoving } from "./game";

let conn: DataConnection;

const peerId = `${Math.floor(Math.random() * 2 ** 18).toString(36).padStart(4, '0')}`;

const peer = new Peer(peerId,
    {
      host: location.hostname,
      port: 8443,
      debug: 1,
      path: "/myapp",
    },
);

document.getElementById('chatbox-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const chatTextInput = document.getElementById('chatbox-textinput') as HTMLInputElement;
    const pNode = document.createElement('p');
    const message = chatTextInput?.value;
    pNode.innerHTML = message;
    pNode.style.backgroundColor = 'white';
    document.getElementById('chatbox')?.appendChild(pNode);
    chatTextInput.value = '';
    
    if (conn?.open) {
        conn.send(message);

        if (amPlayer1()) {
            setPlayerMoving('p1');
        } else {
            setPlayerMoving('p2');
        }
    }
});

peer.on("open", () => {
    let castStatus = document.getElementById('caststatus');
    if (castStatus) {
        castStatus.textContent = `Your device ID is: ${peer.id}`;
    }
});

const setupConnection = (conn: DataConnection) => {
    conn.on('data', (d: any) => {
        const pNode = document.createElement('p');
        pNode.innerHTML = d;
        pNode.style.backgroundColor = 'yellow';
        document.getElementById('chatbox')?.appendChild(pNode);

        if (amPlayer1()) {
            setPlayerMoving('p2');
        } else {
            setPlayerMoving('p1');
        }
    });
};

// click event for call button
document.getElementById('call-btn')?.addEventListener("click", () => {
    const code = window.prompt("Please enter the sharing code");
    if (code) {
        conn = peer.connect(code);
        setupConnection(conn);

        setPlayer('p2');
    }
});

peer.on("connection", (connection) => {
    conn = connection;
    setupConnection(conn);

    setPlayer('p1');
});