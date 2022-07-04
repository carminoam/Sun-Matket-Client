import { CartItemModel } from './../../../models/cart-item.model';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartModel } from 'src/app/models/cart.model';
import { NotifyService } from 'src/app/services/notify.service';
import store from 'src/app/redux/store';
import { Unsubscribe } from 'redux';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  constructor(
    private cartService: CartService,
    private notify: NotifyService
  ) { }

  public totalPrice: number = 0;
  public cartItems: CartItemModel[];
  private cart: CartModel;
  private unsubscribe: Unsubscribe;

  async ngOnInit(): Promise<void> {
    try {
      this.cart = await this.cartService.getCart();
      this.cartItems = await this.cartService.getCartItems(this.cart._id);
      this.totalPrice = this.getTotalPrice(this.cartItems);

      this.unsubscribe = store.subscribe(() => {
        this.cartItems = store.getState().cartState.cartItems;
        this.totalPrice = this.getTotalPrice(this.cartItems);
      });
    } catch (err) {
      this.notify.error(err);
      // console.log(err);
    }
  }

  ngOnDestroy() {
    this.unsubscribe();
  }


  public getTotalPrice(items: CartItemModel[]): number {
    return items.reduce((acc, cur) => acc + cur.totalPrice, 0);
  }

  public async removeItem(itemId: string): Promise<void> {
    try {
      await this.cartService.deleteCartItem(itemId);
      this.cartItems = await this.cartService.getCartItems(this.cart._id);
      this.totalPrice = this.getTotalPrice(this.cartItems);
    } catch (err: any) {
      this.notify.error(err);
      // console.log(err.message);
    }
  }

  public async cleanCart(): Promise<void> {
    await this.cartService.deleteAllCartItems(this.cart._id);
    this.cartItems = [];
    this.totalPrice = 0;
  }

}
