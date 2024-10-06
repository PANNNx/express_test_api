var express = require('express');
var router = express.Router();
var Item = require('../models/item')
const fs = require('fs');
const path = require('path')

// DELETE route to delete an item
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedItem = await Item.findById(id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Delete each image file
        deletedItem.images.forEach(imagePath => {
            fs.unlink(path.join('./', imagePath), err => {
                if (err) {
                    console.error(`Failed to delete image ${imagePath}:`, err);
                }
            });
        });

        // Delete each attachment file
        deletedItem.attachments.forEach(attachmentPath => {
            fs.unlink(path.join('./', attachmentPath), err => {
                if (err) {
                    console.error(`Failed to delete attachment ${attachmentPath}:`, err);
                }
            });
        });

        // Delete the item from the database
        await Item.findByIdAndDelete(id);

        res.status(201).json({ message: 'Delete Success' }); // No content
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
module.exports = router;