const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

const prisma = new PrismaClient();

module.exports = {
    async login(req, res) {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(400).send({ error: 'User not found' });
        }

        if (!await bcrypt.compare(password, user.password)) {
            return res.status(400).send({ error: 'Invalid password' });
        }

        user.password = undefined;

        const profiles = await prisma.userProfile.findMany({
            where: { userId: user.id },
            include: { profile: true }
        });

        const roles = profiles.map(profile => profile.profile.description);

        const token = jwt.sign({ id: user.id, roles }, authConfig.secret, {
            expiresIn: authConfig.expiresIn,
        });

        return res.json({ user, token });
    },
};
