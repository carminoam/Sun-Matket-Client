import { CategoryModel } from './../../../models/category.model';
import { NotifyService } from './../../../services/notify.service';
import { Router } from '@angular/router';
import { ProductsService } from './../../../services/products.service';
import { ProductModel } from './../../../models/product.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  public categories : CategoryModel[] = [];

  // Two-Way binding must be into an empty existing object:
  public product = new ProductModel();

  @ViewChild("imageBox")
  public imageBoxRef: ElementRef<HTMLInputElement>;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private notifyService: NotifyService
  ) { }

  async add() {
    try {
      this.product.image = this.imageBoxRef.nativeElement.files[0];
      const addedProduct = await this.productsService.addProduct(this.product);
      this.notifyService.success("Product has been added, id: " + addedProduct._id);
      this.router.navigateByUrl("/products");
      console.log(this.product);
    }
    catch (err: any) {
      this.notifyService.error(err);
    }
  }

  async ngOnInit(): Promise<void> {
    try {
      this.categories = await this.productsService.getAllCategories();
      console.log(this.categories)
    }
    catch (err: any) {
      this.notifyService.error(err);
    }
  }

}
