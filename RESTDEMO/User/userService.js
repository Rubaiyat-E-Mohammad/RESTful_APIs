const userDAO = require('./userDAO')

const getUsers = (done)=>{
    userDAO.getUsers(done)
}

const getUsersById = (userId, done)=>{
    userDAO.getUsersById(userId, done)
}

const getUsersByName = (username, done)=>{
    userDAO.getUsersByName(username, done)
}

const putUserDetails = (userId, username, done)=>{
    userDAO.putUserDetails(userId, username, done)
}

const addNewUser = (newUser, done)=>{
    userDAO.addNewUser(newUser, done)
}

const deleteUserById = (userId, done)=>{
    userDAO.deleteUserById(userId, done)
}
const deleteUserByName = (username, done)=>{
    userDAO.deleteUserByName(username, done)
}
module.exports = {getUsers, getUsersById, getUsersByName, putUserDetails, addNewUser, deleteUserById, deleteUserByName}