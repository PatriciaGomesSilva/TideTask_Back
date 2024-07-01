// src/routes/userRoutes.js
const { Router } = require('express');
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/auth');

const router = Router();

router.get('/', authMiddleware(['admin']), UserController.index);
router.post('/', authMiddleware(['admin']), UserController.store);
router.get('/:id', authMiddleware(['admin']), UserController.show);
router.put('/:id', authMiddleware(['admin']), UserController.update);
router.delete('/:id', authMiddleware(['admin']), UserController.delete);

module.exports = router;
