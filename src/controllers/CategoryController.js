const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = {
    async index(req, res) {
        const categories = await prisma.category.findMany();
        return res.json(categories);
    },

    async store(req, res) {
        const { description } = req.body;
        const category = await prisma.category.create({ 
            data: { 
                description 
            } 
        });
        return res.json(category);
    },

    async show(req, res) {
        const { id } = req.params;
        const category = await prisma.category.findUnique({ where: { id: parseInt(id) } });
        return res.json(category);
    },

    async update(req, res) {
        const { id } = req.params;
        const { description } = req.body;
        const category = await prisma.category.update({
            where: { id: parseInt(id) },
            data: { description },
        });
        return res.json(category);
    },

    async delete(req, res) {
        const { id } = req.params;
        await prisma.category.delete({ where: { id: parseInt(id) } });
        return res.send();
    },
};
