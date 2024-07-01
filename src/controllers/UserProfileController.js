const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = {
    async index(req, res) {
        const userProfiles = await prisma.userProfile.findMany({
            include: { user: true, profile: true },
        });
        return res.json(userProfiles);
    },

    async store(req, res) {
        const { userId, profileId } = req.body;
        const userProfile = await prisma.userProfile.create({
            data: { userId, profileId },
        });
        return res.json(userProfile);
    },

    async show(req, res) {
        const { userId, profileId } = req.params;
        const userProfile = await prisma.userProfile.findUnique({
            where: { userId_profileId: { userId: parseInt(userId), profileId: parseInt(profileId) } },
            include: { user: true, profile: true },
        });
        return res.json(userProfile);
    },

    async delete(req, res) {
        const { userId, profileId } = req.params;
        await prisma.userProfile.delete({
            where: { userId_profileId: { userId: parseInt(userId), profileId: parseInt(profileId) } },
        });
        return res.send();
    },
};
