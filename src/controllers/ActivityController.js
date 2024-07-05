const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ActivityController {
    static async getAllActivities(req, res) {
        try {
            const activities = await prisma.activity.findMany();
            res.json(activities);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getActivityById(req, res) {
        try {
            const { id } = req.params;
            const activity = await prisma.activity.findUnique({
                where: { id: Number(id) },
            });
            if (!activity) {
                return res.status(404).json({ error: 'Activity not found' });
            }
            res.json(activity);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createActivity(req, res) {
        try {
            const { description, dt_inicial, dt_final, category_id, user_id } = req.body;
            const activity = await prisma.activity.create({
                data: {
                    description,
                    dt_inicial: new Date(dt_inicial),
                    dt_final: new Date(dt_final),
                    category_id: Number(category_id),
                    user_id: Number(user_id),
                },
            });
            res.status(201).json(activity);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateActivity(req, res) {
        try {
            const { id } = req.params;
            const { description, dt_inicial, dt_final, category_id, user_id } = req.body;
            const activity = await prisma.activity.update({
                where: { id: Number(id) },
                data: {
                    description,
                    dt_inicial: new Date(dt_inicial),
                    dt_final: new Date(dt_final),
                    category_id: Number(category_id),
                    user_id: Number(user_id),
                },
            });
            res.json(activity);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteActivity(req, res) {
        try {
            const { id } = req.params;
            await prisma.activity.delete({
                where: { id: Number(id) },
            });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ActivityController;
