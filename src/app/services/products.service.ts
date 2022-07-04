import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product.model';
import { firstValueFrom } from 'rxjs';
import store from '../redux/store';
import { addProductAction, deleteProductAction, fetchCategoriesAction, fetchProductsAction, ProductsAction, updateProductAction } from '../redux/products-state';
import { CategoryModel } from '../models/category.model';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    constructor(private http: HttpClient) { }

    public async getAllProducts(): Promise<ProductModel[]> {
        let products = store.getState().productsState.products;
        if (products.length === 0) {
            products = await firstValueFrom(this.http.get<ProductModel[]>(environment.productsUrl));
            const action: ProductsAction = fetchProductsAction(products);
            store.dispatch(action);
        }
        return products;
    }

    public async getOneProduct(id: string): Promise<ProductModel> {
        let products = await this.getAllProducts();
        const product = products.find(p => p._id === id);
        return product;
    }

    public async addProduct(product: ProductModel): Promise<ProductModel> {
        // Convert ProductModel into FormData:
        
        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("price", product.price.toString());
        formData.append("categoryId", product.categoryId);
        formData.append("pic", product.image);
        
        const addedProduct = await firstValueFrom(this.http.post<ProductModel>(environment.productsUrl, formData));
        console.log(addedProduct);
        store.dispatch(addProductAction(addedProduct));
        
        return addedProduct;
    }
    
    public async updateProduct(product: ProductModel): Promise<ProductModel> {
        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("price", product.price.toString());
        formData.append("categoryId", product.categoryId);
        formData.append("pic", product.image);
        
        const updatedProduct = await firstValueFrom(this.http.put<ProductModel>(environment.productsUrl + product._id, formData));
        
        store.dispatch(updateProductAction(updatedProduct));
        
        return updatedProduct;
    }
    
    public async deleteProduct(id: number): Promise<void> {
        await firstValueFrom(this.http.delete(environment.productsUrl + id));
        store.dispatch(deleteProductAction(id));
    }

    public async getAllCategories(): Promise<CategoryModel[]> {
        let categories = store.getState().productsState.categories;
        if (categories.length === 0) {
            categories = await firstValueFrom(this.http.get<CategoryModel[]>(environment.categoriesUrl));
            store.dispatch(fetchCategoriesAction(categories));
        }
        return categories;
    }
    
    public async searchProducts(searchString: string): Promise<ProductModel[]>{
        const products = await this.getAllProducts();
        const filteredProducts = products.filter(p => p.name.includes(searchString));
        // const filteredProducts = await firstValueFrom(this.http.get<ProductModel[]>(environment.productsUrl + "search/" + searchString));
        return filteredProducts;
    }

    public async filterByCategory(categoryId: string): Promise<ProductModel[]>{
        const products = await this.getAllProducts();
        const filteredProducts = products.filter(p => p.categoryId === categoryId);
        return filteredProducts;
    }
}
