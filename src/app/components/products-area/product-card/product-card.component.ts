import { CartItemModel } from './../../../models/cart-item.model';
import { ProductModel } from './../../../models/product.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  constructor(
    private cartService: CartService
  ) { }

  public showInput: boolean = false;
  public amountToAdd: number = 0;
  private cartId: string = "62a1ca6d40911075b92328bd";
  public productImageUrl = environment.productImageUrl;

  @Input()
  public product: ProductModel;

  // @Output()
  // public report = new EventEmitter<ProductModel>();

  public toggleInput() {
    this.showInput = !this.showInput;
  }

  public async addToCart() {
    try {
    let cartItemToAdd = new CartItemModel();
    cartItemToAdd.productId = this.product._id;
    cartItemToAdd.quantity = this.amountToAdd;
    cartItemToAdd.cartId = this.cartId;
    cartItemToAdd.totalPrice = this.product.price * this.amountToAdd;
    // console.log(cartItemToAdd);
    const cartItem = await this.cartService.addCartItem(cartItemToAdd);
    console.log(cartItem);
    } catch(err) {
      console.log(err);
    }


  }


  ngOnInit(): void {
    try {
     
  
    } catch(err) {
      console.log(err);
    }
  }



}
