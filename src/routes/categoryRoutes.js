const express = require('express');
const CategoryController = require('../controllers/CategoryController');
const auth = require('../middlewares/auth');
const router = express.Router();

router.get('/', auth, CategoryController.getAllCategories);
router.get('/:id', auth, CategoryController.getCategoryById);
router.post('/', auth, CategoryController.createCategory);
router.put('/:id', auth, CategoryController.updateCategory);
router.delete('/:id', auth, CategoryController.deleteCategory);

module.exports = router;
