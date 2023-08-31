const userService = require('./userService')

const getUsers = (done)=>{
    userService.getUsers(done)
}

const getUsersById = (userId, done)=>{
    userService.getUsersById(userId, done)
}

const getUsersByName = (username, done)=>{
    userService.getUsersByName(username, done)
}

const putUserDetails = (userId, username, done)=>{
    userService.putUserDetails(userId, username, done)
}

const addNewUser = (newUser, done)=>{
    userService.addNewUser(newUser, dçone)
}

const deleteUserById = (userId, done)=>{
    userService.deleteUserById(userId, done)
}
const deleteUserByName = (username, done)=>{
    userService.deleteUserByName(username, done)
}
module.exports = {getUsers, getUsersById, getUsersByName, putUserDetails, addNewUser, deleteUserById, deleteUserByName}