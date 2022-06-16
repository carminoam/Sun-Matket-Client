import { CartService } from 'src/app/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { CartModel } from 'src/app/models/cart.model';
import { OrderModel } from 'src/app/models/order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  public order: OrderModel;
  public cart: CartModel;

  constructor(
    private cartService: CartService
  ) { }

  async ngOnInit():Promise <void> {
    this.cart = await this.cartService.getCart();
    console.log(this.cart);
  }

  public async orderNow(): Promise<void> {
    console.log("order now");
  }

}
