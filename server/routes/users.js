const express = require("express");
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');
const User = require("../models/User");
const Item = require('../models/Item')


router.get("/me", requireAuth, async (req, res, next) => {

  try{
    const user = await User.findById(req.session.currentUser._id)
      .select("-password") // remove user password from the query
    
    res.status(200).json(user)
  }
  catch(err){
    next(err)
  }
});

router.patch("/me", requireAuth, async (req, res, next) => {
  const data = req.body
  const id = req.session.currentUser._id

  try{
    const userUpdated = await User.findByIdAndUpdate(id, data)

    res.status(200).json(userUpdated)
  }
  catch(err){
    next(err)
  }
})

router.get("/me/items", requireAuth, async (res, req, next) => {
  const id = req.session.currentUser._id

  try{
    const userItems = await User.find({creator: id})

    res.status(200).json(userItems)
  }
  catch(err){
    next(err)
  }
})






module.exports = router;