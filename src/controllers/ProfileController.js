// src/controllers/ProfileController.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = {
    async index(req, res) {
        const profiles = await prisma.profile.findMany();
        return res.json(profiles);
    },

    async store(req, res) {
        const { description } = req.body;
        const profile = await prisma.profile.create({ data: { description } });
        return res.json(profile);
    },

    async show(req, res) {
        const { id } = req.params;
        const profile = await prisma.profile.findUnique({ where: { id: parseInt(id) } });
        return res.json(profile);
    },

    async update(req, res) {
        const { id } = req.params;
        const { description } = req.body;
        const profile = await prisma.profile.update({
            where: { id: parseInt(id) },
            data: { description },
        });
        return res.json(profile);
    },

    async delete(req, res) {
        const { id } = req.params;
        await prisma.profile.delete({ where: { id: parseInt(id) } });
        return res.send();
    },
};
