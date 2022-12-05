const app = require('express')();
const http = require('http').Server(app);

const { instrument } = require('@socket.io/admin-ui')
const io = require('socket.io')(http, {
    cors: {
        origin: ['https://admin.socket.io', 'http://localhost:3000'],
        methods: ["GET", "POST"],
        credentials: true,
    }
});

const players = {
    //* Schema
    // room1: {
    //     id1: { id: "", username: "", character: "", sprite: "" },
    //     id2: { id: "", username: "", character: "", sprite: "" },
    // },
    // room2: {
    //     id1: { id: "", username: "", character: "", sprite: "" },
    //     id2: { id: "", username: "", character: "", sprite: "" },
    // },
}

io.on('connection', (socket) => {
    console.log(`player ${socket.id} connected`);

    socket.on('join-room', (room, cb) => {
        socket.join(room)
        console.log(`player ${socket.id} joined room ${room}`);
        cb({ id: socket.id, room: room })
        if (!players[room]){
            players[room] = {}
        }
        players[room][socket.id] = {
            id: socket.id,
            username: "",
        }
        io.to(room).emit('update-room', players[room])
    })

    socket.on('start-game', (room) =>{

        const listOfPlayers = Object.keys(players[room])    //["id1", "id2"]
        const seekerIdx = Math.floor(Math.random() * listOfPlayers.length)
        const seekerID = listOfPlayers[seekerIdx]
        listOfPlayers.forEach(id => {
            if (id === seekerID){
                players[room][id] = { ...players[room][id], character: "seeker" }
            } else {
                players[room][id] = { ...players[room][id], character: "hider" }
            }
        })
        io.to(room).emit('update-room', players[room])

        io.to(room).emit('teleport-players')

    })

    socket.on("in-game", () => {
        socket.emit('updating', players["123"])
    })

    socket.on("moved", (sprite) => {
        players["123"][socket.id].sprite = sprite
        socket.emit('updating', players["123"])
    })


    // socket.on('join-room', (room, coords, cb) => {
    //     socket.join(room)

    //     const playersID = Array.from(io.of("/").adapter.rooms.get(room));

    //     cb({ id: socket.id, room: room })

    //     io.to(room).emit('update-room', playersID, socket.id, coords)
    // })

    // socket.on('moving', (room, coords) => {
    //     const playersID = Array.from(io.of("/").adapter.rooms.get(room));
    //     io.to(room).emit('update-room', playersID, socket.id, coords)
    // })

    // socket.on('disconnecting', () => {
    //     Array.from(socket.rooms).forEach(
    //         room => {
    //             let playersID = Array.from(io.of("/").adapter.rooms.get(room)).filter(p => p !== socket.id)
    //             io.to(room).emit('update-room', playersID, socket.id, null)
    //         }
    //     )
    // })


    socket.on('disconnecting', () => {
        Array.from(socket.rooms).forEach(
            room => {
                if (room !== socket.id){
                    delete players[room][socket.id]
                    io.to(room).emit('update-room', players[room])
                    console.log(`player ${socket.id} left room ${room}`);
                }
            }
        )
    })

    socket.on('disconnect', () => {
        console.log(`player ${socket.id} disconnected`);
    });
});

http.listen(3030, () => {
    console.log('server listening on localhost:3030');
});


instrument(io, {
    auth: false
});
