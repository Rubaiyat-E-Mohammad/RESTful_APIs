const { Router } = require('express');
const userController = require('./userController');

const router = Router();

router.get('/', (req,res)=>{
  try{
    const userData = req.claims
    console.log(userData)
    if(!userData.email){
      return res.status(400).send('User emai not available')
    }
    userController.findUser(userData.email, (err,result)=>{
      if(err){
        return res.status(400).send('Error getting the user', err)
      }else{
        return res.status(200).send(result)
      }
    })
  }catch(err){
    return res.status(500).send({error:'unexpected error occured'})
  }
})

router.get("/all", (req, res) => {
  try {
    userController.getUsers((err, results) => {
      if (err) {
        return res.status(400).send(err);
      }
      return res.status(200).send({ status: "Ok", data: results });
    });
  } catch (err) {
    return res.status(500).send('Try after sometime');
  }
});

router.get("/:userId", (req, res)=>{
    try{
        const userId = req.params.userId
        userController.getUsersById(userId, (err, results) => {
            if (err) {
              return res.status(400).send(err);
            }
            return res.status(200).send({ status: "Ok", data: results });
          });
    }catch(err){
        return res.status(500).send('Try after sometime');
    }
})

router.get("/name/:username", (req, res)=>{
    try{
        const username = req.params.username
        userController.getUsersByName(username, (err, results) => {
            if (err) {
              return res.status(400).send(err);
            }
            return res.status(200).send({ status: "Ok", data: results });
          });
    }catch(err){
        return res.status(500).send('Try after sometime');
    }
})

router.put("/:userId", (req, res)=>{
    try{
        const userId = req.params.userId
        const username = req.body.username
        userController.putUserDetails(userId,username, (err, results) => {
            if (err) {
              return res.status(400).send(err);
            }
            return res.status(200).send({ status: "Ok", data: results });
          });
    }catch(err){
        return res.status(500).send('Try after sometime');
    }
})

router.post("/", (req, res)=>{
    try{
        const newUser = req.body
        userController.addNewUser(newUser, (err, results) => {
            if (err) {
              return res.status(400).send(err);
            }
            return res.status(200).send({ status: "Ok", data: results });
          });
    }catch(err){
        return res.status(500).send('Try after sometime');
    }
})

router.delete("/:userId", (req, res)=>{
    try{
        const userId = req.params.userId
        userController.deleteUserById(userId, (err, results) => {
            if (err) {
              return res.status(400).send(err);
            }
            return res.status(200).send({ status: "Ok", data: results });
          });
    }catch(err){
        return res.status(500).send('Try after sometime');
    }
})

router.delete("/name/:username", (req, res)=>{
    try{
        const username = req.params.username
        userController.deleteUserByName(username, (err, results) => {
            if (err) {
              return res.status(400).send(err);
            }
            return res.status(200).send({ status: "Ok", data: results });
        });
    }catch(err){
        return res.status(500).send('Try after sometime');
    }
})

module.exports = router;
