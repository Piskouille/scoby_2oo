const express = require("express");
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');
const User = require("../models/User");
const Item = require('../models/Item')


router.get("/me", requireAuth, async (req, res, next) => {

  try{
    const user = await User.findById(req.session.currentUser)
      .select("-password") // remove user password from the query
    
    res.status(200).json(user)
  }
  catch(err){
    next(err)
  }
});

router.patch("/me", requireAuth, async (req, res, next) => {
  const data = req.body
  const id = req.session.currentUser
  console.log(req.session)
  console.log(data, id)
  try{
    const userUpdated = await User.findByIdAndUpdate(id, data)

    res.status(200).json(userUpdated)
  }
  catch(err){
    next(err)
  }
})

router.get("/me/items", requireAuth, async (req, res, next) => {

  const id = req.session.currentUser

  try{
    const userItems = await Item.find({creator: id})

    res.status(200).json(userItems)
  }
  catch(err){
    next(err)
  }
})






module.exports = router;
