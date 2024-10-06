var express = require('express');
var router = express.Router();
const multer = require('multer');
var Item = require('../models/item')

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if( file.fieldname == "images" ){
            cb(null, 'public/images'); // Directory for uploads
        }
        if( file.fieldname == "attachments" ){
            cb(null, 'public/images/attachments'); // Directory for uploads
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname); // Unique filename
    }
});

const upload = multer({ storage });


// POST route to create a new item
router.post('/', upload.fields([{ name: 'images', optional: true }, { name: 'attachments', optional: true}]), async (req, res) => {
    const {
        letter,
        digit,
        province,
        type,
        caseNumber,
        arrestDate,
        expireDate,
        circumstances,
        owner,
        department,
        tel,
        active
    } = req.body;

    const newItem = new Item({
        letter,
        digit,
        province,
        type,
        caseNumber,
        arrestDate,
        expireDate,
        circumstances,
        owner,
        department,
        tel,
        active,
        images: req.files['images'] ? req.files['images'].map(file => file.path) : [], // Map file paths to an array
        attachments: req.files['attachments'] ? req.files['attachments'].map(file => file.path) : [] // Map file paths to an array
    });

    try {
        await newItem.save({ timestamps: true });
        res.status(201).json(newItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;