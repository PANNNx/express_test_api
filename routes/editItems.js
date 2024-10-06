var express = require('express');
var router = express.Router();
const multer = require('multer');
var Item = require('../models/item')
const fs = require('fs');
const path = require('path')
// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname == "images") {
            cb(null, 'public/images'); // Directory for uploads
        }
        if (file.fieldname == "attachments") {
            cb(null, 'public/images/attachments'); // Directory for uploads
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname); // Unique filename
    }
});

const upload = multer({ storage });

// PUT route to update an item
router.put('/:id', upload.fields([{ name: 'images', optional: true }, { name: 'attachments', optional: true }]), async (req, res) => {
    const { id } = req.params;

    try {

        const existingItem = await Item.findById(id);
        if (!existingItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Update fields with new values
        existingItem.letter = req.body.letter || existingItem.letter;
        existingItem.digit = req.body.digit || existingItem.digit;
        existingItem.province = req.body.province || existingItem.province;
        existingItem.type = req.body.type || existingItem.type;
        existingItem.caseNumber = req.body.caseNumber || existingItem.caseNumber;
        existingItem.date = req.body.date || existingItem.date;
        existingItem.expireDate = req.body.expireDate || existingItem.expireDate;
        existingItem.circumstances = req.body.circumstances || existingItem.circumstances;
        existingItem.owner = req.body.owner || existingItem.owner;
        existingItem.department = req.body.department || existingItem.department;
        existingItem.tel = req.body.tel || existingItem.tel;
        existingItem.active = req.body.active !== undefined ? req.body.active === 'true' : existingItem.active;

        // Remove old files if new ones are uploaded
        if (req.files['images']) {
            // Delete old image files
            existingItem.images.forEach(imagePath => {
                fs.unlink(path.join('./', imagePath), err => {
                    if (err) {
                        console.error(`Failed to delete old image ${imagePath}:`, err);
                    }
                });
            });
            // Update with new image file paths
            existingItem.images = req.files['images'].map(file => file.path);
        }

        if (req.files['attachments']) {
            // Delete old attachment files
            existingItem.attachments.forEach(attachmentPath => {
                fs.unlink(path.join('./', attachmentPath), err => {
                    if (err) {
                        console.error(`Failed to delete old attachment ${attachmentPath}:`, err);
                    }
                });
            });
            // Update with new attachment file paths
            existingItem.attachments = req.files['attachments'].map(file => file.path);
        }
        // Save the updated item
        const updatedItem = await existingItem.save();
        res.json(updatedItem);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
module.exports = router;