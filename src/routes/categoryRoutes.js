const { Router } = require('express');
const CategoryController = require('../controllers/CategoryController');
const authMiddleware = require('../middlewares/auth');

const router = Router();

router.get('/', authMiddleware(['admin']), CategoryController.index);
router.post('/', authMiddleware(['admin']), CategoryController.store);
router.get('/:id', authMiddleware(['admin']), CategoryController.show);
router.put('/:id', authMiddleware(['admin']), CategoryController.update);
router.delete('/:id', authMiddleware(['admin']), CategoryController.delete);

module.exports = router;
