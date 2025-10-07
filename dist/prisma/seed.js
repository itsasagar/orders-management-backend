"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const user1 = await prisma.user.create({
        data: {
            email: 'john@example.com',
            name: 'John Doe',
        },
    });
    const user2 = await prisma.user.create({
        data: {
            email: 'jane@example.com',
            name: 'Jane Smith',
        },
    });
    const product1 = await prisma.product.create({
        data: {
            name: 'Laptop',
            description: 'High-performance laptop',
            price: 999.99,
            stock: 50,
        },
    });
    const product2 = await prisma.product.create({
        data: {
            name: 'Mouse',
            description: 'Wireless mouse',
            price: 29.99,
            stock: 100,
        },
    });
    const product3 = await prisma.product.create({
        data: {
            name: 'Keyboard',
            description: 'Mechanical keyboard',
            price: 79.99,
            stock: 75,
        },
    });
    console.log('Seed data created successfully');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map