//dependecies
const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
//importar funciones de Users.js
const {addUser, removeUser, getUser, getUsersInRoom} = require ('./Users.js');
//port
const PORT = process.env.PORT || 5000;
//router
const router = require('./router');
//app
const app = express();

//socket io
const server = http.createServer(app);
const io = socketio(server);
//middleware
app.use(router);
app.use(cors());

io.on('connection',(socket)=>{
    console.log('Nueva conexión');
    socket.on('join', ({name, room}, callback)=>{
        //obtengo el nombre y la sala desde el front
        console.log(name, room);
        const {error, user} = addUser({id: socket.id, name, room});
        //si hay error muestro el mensaje de usuario ocupado
        if(error) return callback(error);
        socket.join(user.room);
        //si no hay error
        //mensajes de sistema (usuario entro, usuario desconectado)
        socket.emit('message', {user: "admin", text: `${user.name}, bienvenido a la sala de chat ${user.room}`});
        //mensaje que manda ademas de al usuario (mensaje que le llega a todos lo usuarios de la sala)
        socket.broadcast.to(user.room).emit('message', {user:"admin", text:`${user.name}, ha entrado a la sala`});
        
        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});
        //callback();
        callback();
    });
    //eventos para los mensajes generados por los usuarios
    socket.on('sendMessage', (message, callback)=>{
        //obtengo al usuario que envia el mensaje
        const user = getUser(socket.id);
        io.to(user.room).emit('message', {user: user.name, text: message});
        callback();
    });
    socket.on('disconnect', ()=>{
        const user = removeUser(socket.id)
        if(user){
            io.to(user.room).emit('message', {user: "admin", text: `${user.name} se ha desconectado`})
            io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});
        }
        console.log('Usuario se fue');
    })
})

//server running
server.listen(PORT, ()=> console.log(`Server a iniciadoo en port ${PORT}`));