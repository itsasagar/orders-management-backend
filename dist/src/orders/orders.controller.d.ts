import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
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
    findAll(page?: string, limit?: string, search?: string): Promise<{
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
}
