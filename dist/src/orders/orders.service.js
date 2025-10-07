"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OrdersService = class OrdersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createOrderDto) {
        const { userId, items } = createOrderDto;
        const productIds = items.map((item) => item.productId);
        const products = await this.prisma.product.findMany({
            where: { id: { in: productIds } },
        });
        let total = 0;
        const orderItems = items.map((item) => {
            const product = products.find((p) => p.id === item.productId);
            if (!product) {
                throw new Error(`Product with id ${item.productId} not found`);
            }
            const itemTotal = product.price * item.quantity;
            total += itemTotal;
            return {
                productId: item.productId,
                quantity: item.quantity,
                price: product.price,
            };
        });
        const order = await this.prisma.$transaction(async (prisma) => {
            const newOrder = await prisma.order.create({
                data: {
                    userId,
                    total,
                    status: 'pending',
                    orderItems: {
                        create: orderItems,
                    },
                },
                include: {
                    orderItems: {
                        include: {
                            product: true,
                        },
                    },
                    user: true,
                },
            });
            for (const item of items) {
                await prisma.product.update({
                    where: { id: item.productId },
                    data: {
                        stock: {
                            decrement: item.quantity,
                        },
                    },
                });
            }
            return newOrder;
        });
        this.processOrderAsync(order.id);
        return order;
    }
    async findAll(page = 1, limit = 10, search) {
        const skip = (page - 1) * limit;
        const where = search
            ? {
                OR: [
                    { user: { name: { contains: search, mode: 'insensitive' } } },
                    { user: { email: { contains: search, mode: 'insensitive' } } },
                ],
            }
            : {};
        const [orders, total] = await Promise.all([
            this.prisma.order.findMany({
                where,
                skip,
                take: limit,
                include: {
                    user: true,
                    orderItems: {
                        include: {
                            product: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
            }),
            this.prisma.order.count({ where }),
        ]);
        return {
            data: orders,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async processOrderAsync(orderId) {
        setTimeout(async () => {
            await this.prisma.order.update({
                where: { id: orderId },
                data: { status: 'confirmed' },
            });
            console.log(`Order ${orderId} confirmed asynchronously`);
        }, 2000);
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map