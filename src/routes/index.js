const { Router } = require('express');
const authRoutes = require('./authRoutes');
const categoryRoutes = require('./categoryRoutes');
const profileRoutes = require('./profileRoutes');
const userRoutes = require('./userRoutes');
const userProfileRoutes = require('./userProfileRoutes');

const router = Router();

router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/profiles', profileRoutes);
router.use('/users', userRoutes);
router.use('/user-profiles', userProfileRoutes);

module.exports = router;
