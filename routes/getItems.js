var express = require('express');
var router = express.Router();
var Item = require('../models/item')

/* GET users listing. */
router.get('/', async (req, res) => {
    try {
        // Default to page 1 and limit to 10
        const { page = 1, limit = 10, letter, digit, province, type, active, department } = req.query;
        const filter = {};
    
        if (letter) filter.letter = letter;
        if (digit) filter.digit = digit;
        if (province) filter.province = province;
        if (type) filter.type = type;
        if (active !== undefined) filter.active = active === 'true'
        if (department) filter.department = department;
        
        const items = await Item.find(filter).limit(Number(limit))
            .skip((page - 1) * limit)

        const totalItems = await Item.countDocuments(filter)
        const totalPages = Math.ceil(totalItems / limit)

        res.json(
            {
                items,
                totalItems,
                totalPages,
                currentPage: Number(page)
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET route to fetch item by ID
router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
