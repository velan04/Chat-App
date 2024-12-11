let usersData = []

const addUsers = ({id, name, room}) => {
    if(!name || !room) return {error: 'User and room are required'}

    name = name.trim().toLowerCase()
    room = room.trim().toLowerCase()

    if(usersData.length){
        const existingUser = usersData.find((user) => user.room === room && user.name === name);
        if(existingUser) return {error: 'User is already exist'};
    }

    const user ={id, name, room};
    usersData.push(user)
    return {user}
}

const removeUser = (id) => {
    const index = usersData.findIndex((user) => user.id === id);
    if(index >= 0) return usersData.splice(index, 1)[0];
}

const getUser = (id) => usersData.find((user) => user.id === id)



module.exports = { addUsers, removeUser,   getUser} 