const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const password = await bcrypt.hash('admin123', 8);

    await prisma.profile.createMany({
        data: [
            { description: 'USER' },
            { description: 'ADMIN' },
        ],
    });

    const adminUser = await prisma.user.create({
        data: {
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@example.com',
            password,
        },
    });

    const adminProfile = await prisma.profile.findUnique({
        where: { description: 'ADMIN' },
    });

    await prisma.userProfile.create({
        data: {
            userId: adminUser.id,
            profileId: adminProfile.id,
        },
    });

    console.log('Admin user created');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
