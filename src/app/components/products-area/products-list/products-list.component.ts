import { CategoryModel } from './../../../models/category.model';
import { NotifyService } from './../../../services/notify.service';
import { ProductsService } from './../../../services/products.service';
import { ProductModel } from './../../../models/product.model';
import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Unsubscribe } from 'redux';
import store from 'src/app/redux/store';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  public products: ProductModel[];
  public searchString: string;
  public filteredProducts: ProductModel[];
  public categories: CategoryModel[];
  // private unsubscribe: Unsubscribe;

  constructor(
    private productsService: ProductsService,
    private notifyService: NotifyService
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      this.categories = await this.productsService.getAllCategories();
      this.products = await this.productsService.getAllProducts();
      this.filteredProducts = this.products;
      // this.unsubscribe = store.subscribe(async () => {
      //   this.products = await this.productsService.getAllProducts();
      // });
    }
    catch (err: any) {
      this.notifyService.error(err);
    }
  }

  // ngOnDestroy() {
  //   this.unsubscribe();
  // }

  public async searchByString(str: string): Promise<void> {
    if (str) {
      this.filteredProducts = await this.productsService.searchProducts(str);
    } else {
      this.filteredProducts = this.products;
    }
  }

  public category: CategoryModel;
  // public categoryChanged(): void {
  //   console.log("categoryChanged");
  // }

  public async filterByCategory(event: MatSelectChange): Promise<void> {
    // const categoryId = (event.target as HTMLSelectElement).value;
    if (event.value === "none") {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = await this.productsService.filterByCategory(event.value);
    }
  }
}


