const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class UserController {
    static async getAllUsers(req, res) {
        try {
            const users = await prisma.user.findMany();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await prisma.user.findUnique({
                where: { id: Number(id) },
            });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createUser(req, res) {
        try {
            const { first_name, last_name, email, password } = req.body;
            const user = await prisma.user.create({
                data: {
                    first_name,
                    last_name,
                    email,
                    password,
                },
            });
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { first_name, last_name, email, password } = req.body;
            const user = await prisma.user.update({
                where: { id: Number(id) },
                data: {
                    first_name,
                    last_name,
                    email,
                    password,
                },
            });
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteUser(req, res) {
        try {
            const { id } = req.params;
            await prisma.user.delete({
                where: { id: Number(id) },
            });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UserController;
