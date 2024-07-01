const { Router } = require('express');
const UserProfileController = require('../controllers/UserProfileController');
const authMiddleware = require('../middlewares/auth');

const router = Router();

router.get('/', authMiddleware(['admin']), UserProfileController.index);
router.post('/', authMiddleware(['admin']), UserProfileController.store);
router.get('/:userId/:profileId', authMiddleware(['admin']), UserProfileController.show);
router.delete('/:userId/:profileId', authMiddleware(['admin']), UserProfileController.delete);

module.exports = router;
