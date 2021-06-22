const express = require("express");
const dotenv = require('dotenv');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = 8001;
const ACTIONS = require('../client/src/socket/actions');
const cors = require("cors");
const {version, validate} = require('uuid');
dotenv.config();
app.use(cors());

function getClientRooms() {
    const {rooms} = io.sockets.adapter;
    return Array.from(rooms.keys()).filter(roomID => validate(roomID) && version(roomID) === 4);
}

function shareRoomsInfo() {
    io.emit(ACTIONS.SHARE_ROOMS, {
        rooms: getClientRooms()
    })
}

io.on('connection', socket => {
    shareRoomsInfo();

    console.log('Client connected');

    socket.on(ACTIONS.JOIN, config => {
        const {room: roomID} = config;
        const {rooms: joinedRooms} = socket;
        if (Array.from(joinedRooms).includes(roomID)) {
            return console.warn(`Already joined to ${roomID}`);
        }

        const clients = Array.from(io.sockets.adapter.rooms.get(roomID) || []);

        clients.forEach(clientID => {
            io.to(clientID).emit(ACTIONS.ADD_PEER, {
                peerID: socket.id,
                createOffer: false
            });

            socket.emit(ACTIONS.ADD_PEER, {
                peerID: clientID,
                createOffer: true,
            });
        });

        socket.join(roomID);
        shareRoomsInfo();
    });

    function leaveRoom() {
        const {rooms} = socket;

        Array.from(rooms)
            .filter(roomID => validate(roomID) && version(roomID) === 4)
            .forEach(roomID => {

                const clients = Array.from(io.sockets.adapter.rooms.get(roomID) || []);

                clients
                    .forEach(clientID => {
                        io.to(clientID).emit(ACTIONS.REMOVE_PEER, {
                            peerID: socket.id,
                        });

                        socket.emit(ACTIONS.REMOVE_PEER, {
                            peerID: clientID,
                        });
                    });

                socket.leave(roomID);
            });

        shareRoomsInfo();
    }

    socket.on(ACTIONS.LEAVE, leaveRoom);
    socket.on('disconnecting', leaveRoom);

    socket.on(ACTIONS.RELAY_SDP, ({peerID, sessionDescription}) => {
        io.to(peerID).emit(ACTIONS.SESSION_DESCRIPTION, {
            peerID: socket.id,
            sessionDescription,
        });
    });

    socket.on(ACTIONS.RELAY_ICE, ({peerID, iceCandidate}) => {
        io.to(peerID).emit(ACTIONS.ICE_CANDIDATE, {
            peerID: socket.id,
            iceCandidate,
        });
    });
}); //соединение с сокетом


app.get("/");
app.use(express.urlencoded({extended: true}));
app.use(express.static("./public"));
app.use("/api", require("./api/routes/index"));

server.listen(port);

// proxy_set_header Access-Control-Allow-Origin *;
