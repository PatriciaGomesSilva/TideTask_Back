// src/controllers/UserController.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

module.exports = {
    async index(req, res) {
        const users = await prisma.user.findMany();
        return res.json(users);
    },

    async store(req, res) {
        const { firstName, lastName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({ data: { firstName, lastName, email, password: hashedPassword } });
        return res.json(user);
    },

    async show(req, res) {
        const { id } = req.params;
        const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
        return res.json(user);
    },

    async update(req, res) {
        const { id } = req.params;
        const { firstName, lastName, email } = req.body;
        const user = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { firstName, lastName, email },
        });
        return res.json(user);
    },

    async delete(req, res) {
        const { id } = req.params;
        await prisma.user.delete({ where: { id: parseInt(id) } });
        return res.send();
    },
};
