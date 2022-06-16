import { ProductModel } from "./product.model";

export class CartItemModel {
    public _id: string; // pk
    public productId: string;  // fk
    public cartId: string; // fk
    public quantity: number;
    public totalPrice: number;
    public product: ProductModel;
}