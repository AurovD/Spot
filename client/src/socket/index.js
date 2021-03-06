import {io} from 'socket.io-client';
// настройки сокета
const options = {
    "force new connection": true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websocket"]
}

// const socket = io('http://localhost:8001/', options);
const socket = io('http://api.aurovd.ru/', options);

export default socket;