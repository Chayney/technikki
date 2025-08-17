import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient();

async function main() {
    await prisma.category.createMany({
        data: [
            { name: 'PHP' },
            { name: 'Laravel' },
            { name: 'React' },
            { name: 'Next.js' },
            { name: 'その他' },
        ],
    });
}

main()
    .then(() => {
        console.log('Dummy data inserted.');
    })
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
