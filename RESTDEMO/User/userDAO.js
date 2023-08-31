const fs = require('fs')

const getUsers = (done)=>{
    fs.readFile('/Users/rubaiyatemohammad/skills/REST API/RestDemo/User/users.json', (err, fileContent)=>{
        if(err){
            return done("Encountered error")
        }
        let userData = JSON.parse(fileContent)
        return done(null, userData)
    })
}

const getUsersById = (userId, done)=>{
    fs.readFile('/Users/rubaiyatemohammad/skills/REST API/RESTDEMO/User/users.json', (err, fileContent)=>{
        if(err){
            return done("Error encountered")
        }
        let userData = JSON.parse(fileContent)
        const fetchedUsers = userData.find(usr => usr.userId === parseInt(userId))
        if(!fetchedUsers){
            return done('No user found')
        }
        return done(null, fetchedUsers)
    })
}

const getUsersByName = (username, done)=>{
    fs.readFile('/Users/rubaiyatemohammad/skills/REST API/RESTDEMO/User/users.json', (err, fileContent)=>{
        if(err){
            return done("Error encountered")
        }
        let userData = JSON.parse(fileContent)
        const fetchedUsers = userData.find(usr => usr.username === username)
        if(!fetchedUsers){
            return done('No user found')
        }
        return done(null, fetchedUsers)
    })
}

const putUserDetails = (userId,username, done)=>{
    fs.readFile('/Users/rubaiyatemohammad/skills/REST API/RESTDEMO/User/users.json', (err, fileContent)=>{
        if(err){
            return done("Error encountered")
        }
        let userData = JSON.parse(fileContent)
        let index = userData.findIndex(usr => usr.userId === parseInt(userId))
        if(index === -1){
            return done('No user found')
        }
        userData[index].username = username
        fs.writeFile('/Users/rubaiyatemohammad/skills/REST API/RESTDEMO/User/users.json', JSON.stringify(userData),(err, updatedContent)=>{
            if(err){
                return done("updating error")
            }
            return done(null, userData[index])
        })
    })
}

const addNewUser = (newUser, done)=>{
    fs.readFile('/Users/rubaiyatemohammad/skills/REST API/RESTDEMO/User/users.json', (err, fileContent)=>{
        if(err){
            return done("Error encountered")
        }
        let userData = JSON.parse(fileContent)
        const newUserId = userData.length + 101;
        const userToAdd = {
            username: newUser.username,
            userId: newUserId
        }
        userData.push(userToAdd);
        fs.writeFile('/Users/rubaiyatemohammad/skills/REST API/RESTDEMO/User/users.json', JSON.stringify(userData),(err, updatedContent)=>{
            if(err){
                return done("updating error")
            }
            return done(null, userData)
        })
    })
}

const deleteUserById = (userId, done)=>{
    fs.readFile('/Users/rubaiyatemohammad/skills/REST API/RESTDEMO/User/users.json', (err, fileContent)=>{
        if(err){
            return done("Error encountered")
        }
        let userData = JSON.parse(fileContent)
        const updatedUser = userData.filter(usr=> usr.userId !== parseInt(userId))
        fs.writeFile('/Users/rubaiyatemohammad/skills/REST API/RESTDEMO/User/users.json', JSON.stringify(updatedUser),(err, updatedContent)=>{
            if(err){
                return done("updating error")
            }
            return done(null, updatedUser)
        })
    })
}

const deleteUserByName = (username, done)=>{
    fs.readFile('/Users/rubaiyatemohammad/skills/REST API/RESTDEMO/User/users.json', (err, fileContent)=>{
        if(err){
            return done("Error encountered")
        }
        let userData = JSON.parse(fileContent)
        const updatedUser = userData.filter(usr=> usr.username != username)
        fs.writeFile('/Users/rubaiyatemohammad/skills/REST API/RESTDEMO/User/users.json', JSON.stringify(updatedUser),(err, updatedContent)=>{
            if(err){
                return done("updating error")
            }
            return done(null, updatedUser)
        })
    })
}

module.exports = {getUsers, getUsersById, getUsersByName, putUserDetails, addNewUser, deleteUserById, deleteUserByName}


