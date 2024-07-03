const { Router } = require('express');
const ProfileController = require('../controllers/ProfileController');
const authMiddleware = require('../middlewares/auth');

const router = Router();

router.get('/', authMiddleware(['admin']), ProfileController.index);
router.post('/', authMiddleware(['admin']), ProfileController.store);
router.get('/:id', authMiddleware(['admin']), ProfileController.show);
router.put('/:id', authMiddleware(['admin']), ProfileController.update);
router.delete('/:id', authMiddleware(['admin']), ProfileController.delete);

module.exports = router;
