import { OrderModel } from './../models/order.model';
import store from 'src/app/redux/store';
import { Injectable } from '@angular/core';
import { CartItemModel } from '../models/cart-item.model';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CartModel } from '../models/cart.model';
import { addToCartAction, deleteAllCartItemsAction, fetchCartItemsAction, removeFromCartAction, updateCartItemAction } from '../redux/cart-state';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  // Get cart object (if not exists, create it):
  public async getCart() {
    let cart = store.getState().cartState.cart;
    if (!cart) {
      cart = await firstValueFrom(this.http.get<CartModel>(environment.cartUrl));
    }
    return cart;
  }

  // Get cart items:
  public async getCartItems(cartId: string): Promise<CartItemModel[]> {
    let cartItems = store.getState().cartState.cartItems;
    if (cartItems.length  === 0) {
      cartItems = await firstValueFrom(this.http.get<CartItemModel[]>(environment.cartItemsUrl + cartId));
      store.dispatch(fetchCartItemsAction(cartItems));
    }
    return cartItems;
  }

  // Add cart item:
  public async addCartItem(cartItem: CartItemModel): Promise<CartItemModel> {
    const cartItemAdded = await firstValueFrom(this.http.post<CartItemModel>(environment.cartItemsUrl, cartItem));
    store.dispatch(addToCartAction(cartItemAdded));
    return cartItemAdded;
  }

  // Delete cart item:
  public async deleteCartItem(itemId: string): Promise<void> {
    store.dispatch(removeFromCartAction(itemId));
    await firstValueFrom(this.http.delete(environment.cartItemsUrl + itemId));
  }

  // Update cart item:
  public async updateCartItem(cartItem: CartItemModel): Promise<CartItemModel> {
    const cartItemUpdated = await firstValueFrom(this.http.put<CartItemModel>(environment.cartItemsUrl + cartItem._id, cartItem));
    store.dispatch(updateCartItemAction(cartItemUpdated));
    return cartItemUpdated;
  }

  // Delete ALL cart items:
  public async deleteAllCartItems(cartId: string): Promise<void> {
    await firstValueFrom(this.http.delete(environment.cartItemsUrl + "clean/" + cartId));
    store.dispatch(deleteAllCartItemsAction(cartId));
  }

  // Create new order:
  public async createOrder(order: OrderModel): Promise<void> {
    await firstValueFrom(this.http.post<OrderModel>(environment.ordersUrl, order ));
  }
  
}
