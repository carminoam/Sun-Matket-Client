import { CartItemModel } from './../../../models/cart-item.model';
import { ProductModel } from './../../../models/product.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CartService } from 'src/app/services/cart.service';
import { CartModel } from 'src/app/models/cart.model';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  async ngOnInit(): Promise<void> {
    try {
      this.cart = await this.cartService.getCart();
    } catch (err) {
      this.notify.error(err);
    }
  }

  constructor(
    private cartService: CartService,
    private notify: NotifyService
  ) { }

  public showInput: boolean = false;
  public amountToAdd: number = 0;
  private cart: CartModel;
  public productImageUrl = environment.productImageUrl;

  @Input()
  public product: ProductModel;

  public toggleInput() {
    this.showInput = !this.showInput;
  }

  public async addToCart() {
    try {
      let cartItemToAdd = new CartItemModel();

      cartItemToAdd.productId = this.product._id;
      cartItemToAdd.quantity = this.amountToAdd;
      cartItemToAdd.cartId = this.cart._id;
      cartItemToAdd.totalPrice = this.product.price * this.amountToAdd;
      // console.log(cartItemToAdd);
      const cartItem = await this.cartService.addCartItem(cartItemToAdd);
      console.log(cartItem);
    } catch (err) {
      console.log(err);
    }


  }



}
