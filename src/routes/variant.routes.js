const express = require('express')
const router = express.Router()

const variantController = require('../controllers/variant.controller');

router.get('/',variantController.findAll);

router.post('/',variantController.create);

router.get('/:id',variantController.findById)

router.put('/:id',variantController.update);

router.delete('/:id',variantController.delete);

router.get('/product-id/:product_id',variantController.findByProductId);

module.exports = router;
