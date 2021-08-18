const express = require("express");
const router = express.Router();
const Item = require('../models/Item');
const requireAuth = require('../middlewares/requireAuth')
const uploader = require('../config/cloudinary')

router.get('/', (req, res, next) => {
    Item
    .find().populate('creator', "-password").exec()
    .then((itemsDocument) => {
        res.status(200).json(itemsDocument)
    })
    .catch((err) => {
        res.status(500).json(err)
    })  
})

router.get('/:id', (req, res, next) => {
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

router.post('/', uploader.single("image"), (req, res, next) => {
    console.log('REQ', req.body)

    const data = JSON.parse(req.body.sendData)

    if(req.file) {
        data.image = req.file.path;
    } else {
        data.image = 'https://retailx.com/wp-content/uploads/2019/12/iStock-476085198.jpg';
    }

    console.log('DATAAAAA', data)

    Item.create(data)
    .then((createdItem) => {
        res.status(201).json(createdItem);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.patch('/:id', async (req, res, next) => {

    try {
        const updated = await Item.findByIdAndUpdate(id, req.body, {
          new: true, 
        });
        res.status(200).json(updated);
        }catch (err) {
            res.status(500).json(err)
        }
});


router.delete('/:id', (req, res, next) => {
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