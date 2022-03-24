//manejo de usuarios (acceder, desconectar, remover, todo lo que tenga que ver con usuarios)
const users = [];
const addUser =({id, name, room})=>{
    //cambiar la entrada de nombre de PUREBA 1 a prueba1 por ejemplo
    name = name.trim().toLowerCase();
    //cambiar la entrada de sala de PUREBA 1 a prueba1 por ejemplo
    room = room.trim().toLowerCase();
    //checar si ya existe un usuario para que no se repita
    const existingUser = users.find((user)=>user.room === room && user.name === name);
    if(!name || !room) return { error: 'Username y sala requerida.' };
    if(existingUser){
        return{error:'El nombre de usuario ya existe'};
    }
    //si no existe el usuario lo creo
    const user = {id, name, room};
    //lo agrego al array de users
    users.push(user);
    return{user};
}
const removeUser =(id)=>{
    //encontrar al usuario por id
    const index = users.findIndex((user)=>user.id === id);
    if(index !== -1) return users.splice(index, 1)[0];
 
    
}
//ver si hay usuarios
const getUser = (id)=>users.find((user)=> user.id === id);

const getUsersInRoom = (room)=> users.filter((user)=>user.room === room);
//exportar funciones
module.exports = {addUser, removeUser, getUser, getUsersInRoom};