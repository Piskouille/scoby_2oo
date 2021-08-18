const express = require("express");
const router = express.Router();
const Item = require('../models/Item');
const requireAuth = require('../middlewares/requireAuth')
const mongoose = require('mongoose')

router.get('/api/items', requireAuth, (req, res, next) => {
    Item
    .find()
    .then((itemsDocument) => {
        res.status(200).json(itemsDocument)
    })
    .catch((err) => {
        res.status(500).json(err)
    })  
})

router.get('/api/items/:id', requireAuth,  (req, res, next) => {
    Item.findOneById(req.params.id)
    .then((foundItem) => {
        if(!foundItem) {
            return res.status(404).json({message: "Item not found !"})
        }
        res.status(200).json(foundItem)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.post('/api/items', requireAuth, (req, res, next) => {
    Item.create(req.body)
    .then((createdItem) => {
        res.status(201).json(createdItem);
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.patch('/api/items/:id', requireAuth, async (req, res, next) => {

    try {
        const updated = await Item.findByIdAndUpdate(id, req.body, {
          new: true, 
        });
        res.status(200).json(updated);
        }catch (err) {
            res.status(500).json(err)
        }
});


router.delete('/api/items/:id', requireAuth, (req, res, next) => {
    Item.findByIdAndDelete(req.params.id).then((deletedItem) => {
        if(!deletedItem) {
            res.status(404).json({message : 'This item does not exist'})
        }
        res.sendStatus(204)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

module.exports = router;