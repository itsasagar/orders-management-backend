declare class OrderItemDto {
    productId: number;
    quantity: number;
}
export declare class CreateOrderDto {
    userId: number;
    items: OrderItemDto[];
}
export {};
