import store from 'src/app/redux/store';
import { Injectable } from '@angular/core';
import { CartItemModel } from '../models/cart-item.model';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { fetchCartItemsAction } from '../redux/cart-state';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  // Bring all the cart items.
  public async fetchCartItemsByCartId(cartId:string):Promise <CartItemModel[]> {
    let cartItems = store.getState().cartState.cart;
    if(!cartItems){
      cartItems = await firstValueFrom(this.http.get<CartItemModel[]>(environment.cartUrl + "items/" + cartId));
      store.dispatch(fetchCartItemsAction(cartItems));
    }
    return cartItems;
  }

  // Add a new cart item.
  public async addCartItem(cartItem:CartItemModel):Promise <CartItemModel> {
    const addedCartItem = await firstValueFrom(this.http.post<CartItemModel>(environment.cartItemUrl ,cartItem));
    return addedCartItem;
  }

}
