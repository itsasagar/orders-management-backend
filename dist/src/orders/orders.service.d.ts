import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createOrderDto: CreateOrderDto): Promise<{
        user: {
            email: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        };
        orderItems: ({
            product: {
                name: string;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                description: string | null;
                price: number;
                stock: number;
            };
        } & {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            price: number;
            productId: number;
            quantity: number;
            orderId: number;
        })[];
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        status: string;
        total: number;
    }>;
    findAll(page?: number, limit?: number, search?: string): Promise<{
        data: ({
            user: {
                email: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                id: number;
            };
            orderItems: ({
                product: {
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    id: number;
                    description: string | null;
                    price: number;
                    stock: number;
                };
            } & {
                createdAt: Date;
                updatedAt: Date;
                id: number;
                price: number;
                productId: number;
                quantity: number;
                orderId: number;
            })[];
        } & {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            userId: number;
            status: string;
            total: number;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    private processOrderAsync;
}
