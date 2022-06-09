export class ProductModel {
    public _id: string;
    public name: string;
    public price: number;
    public categoryId: string;
    public category: any;
    public cartQuantity: number = 0;
    public imageName: string;
    public image: File;
}

