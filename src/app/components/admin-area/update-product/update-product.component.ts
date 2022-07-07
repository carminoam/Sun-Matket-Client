import { CategoryModel } from './../../../models/category.model';
import { ProductsService } from './../../../services/products.service';
import { NotifyService } from './../../../services/notify.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from 'src/app/models/product.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  public product: ProductModel;
  public categories: CategoryModel[];
  public productImagesUrl = environment.productImageUrl;

  @ViewChild("imageBox")
  public imageBoxRef: ElementRef<HTMLInputElement>;

  constructor(
    private notify: NotifyService,
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router
  ) { }

  async ngOnInit():Promise <void> {
    try{
      this.categories = await this.productsService.getAllCategories();
      const id = this.activatedRoute.snapshot.params["id"];
      this.product = await this.productsService.getOneProduct(id);

    } catch(err){
      this.notify.error(err);
    }
  }

  public async onUpdate(value: ProductModel): Promise<void> {
    this.product.name = value.name;
    this.product.price = value.price;
    this.product.categoryId = value.categoryId;
    this.product.image = this.imageBoxRef.nativeElement.files[0];
    const updatedProduct = await this.productsService.updateProduct(this.product);
    this.notify.success("Product has been updated, id: " + updatedProduct._id);
    this.router.navigate(["/admin"]);
  }
}
