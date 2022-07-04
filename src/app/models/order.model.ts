export class OrderModel {
    public orderId: string; // pk
    public cartId: string; // fk
    public userId: string; // fk (not required)
    public orderDate: Date; 
    public deliveryDate: Date;
    public payment4Digits: string;
    public city: string;
    public street: string;
    public totalPrice: number;
}