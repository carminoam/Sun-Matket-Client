import { CartItemModel } from './../../../models/cart-item.model';
import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Input()
  public cartList: CartItemModel[];

  private cartId: string = "62a1ca6d40911075b92328bd";

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    try {
      // const cartItems = this.cartService.fetchCartItemsByCartId(this.cartId);
  
    } catch(err) {
      console.log(err);
    }
  }
}
