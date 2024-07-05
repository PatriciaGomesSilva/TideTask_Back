const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CategoryController {
    static async getAllCategories(req, res) {
        try {
            const categories = await prisma.category.findMany();
            res.json(categories);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getCategoryById(req, res) {
        try {
            const { id } = req.params;
            const category = await prisma.category.findUnique({
                where: { id: Number(id) },
            });
            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }
            res.json(category);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createCategory(req, res) {
        try {
            const { description } = req.body;
            const category = await prisma.category.create({
                data: {
                    description,
                },
            });
            res.status(201).json(category);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateCategory(req, res) {
        try {
            const { id } = req.params;
            const { description } = req.body;
            const category = await prisma.category.update({
                where: { id: Number(id) },
                data: {
                    description,
                },
            });
            res.json(category);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteCategory(req, res) {
        try {
            const { id } = req.params;
            await prisma.category.delete({
                where: { id: Number(id) },
            });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = CategoryController;
