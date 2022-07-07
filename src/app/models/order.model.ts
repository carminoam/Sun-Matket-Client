export class OrderModel {
    public _id: string; // pk
    public cartId: string; // fk
    public userId: string; // fk (not required)
    public orderDate: Date; 
    public deliveryDate: Date;
    public city: string;
    public street: string;
    public totalPrice: number;
    public payment4Digits: string = "";
    public expirationDate: Date;
    public threeDigits: string;
}