import { NotifyService } from './../../../services/notify.service';
import { ProductsService } from './../../../services/products.service';
import { ProductModel } from './../../../models/product.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  public products: ProductModel[];

  constructor(
     private productsService: ProductsService,
     private notifyService: NotifyService
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      this.products = await this.productsService.getAllProducts();
      // console.log(this.products);
    }
    catch (err: any) {
      this.notifyService.error(err);
    }
  }

  // public updateCart(product: ProductModel) {
  //   this.cartProducts.push(product);
  //   console.log(this.cartProducts);
  // }

}
