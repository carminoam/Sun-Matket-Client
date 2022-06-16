import { CartModel } from './../models/cart.model';
import { CartItemModel } from './../models/cart-item.model';


export class CartState {
    public cart: CartModel;
    public cartItems: CartItemModel[];
}

export enum CartActionType {
    FetchCart = "FetchCart",
    FetchCartItems = "FetchCartItems",
    AddToCart = "AddToCart",
    RemoveFromCart = "RemoveFromCart",
    UpdateCartItem = "UpdateCartItem",
    DeleteAllCartItems = "DeleteAllCartItems",
}

export interface CartAction {
    type: CartActionType;
    payload: any;
}

export function fetchCart(cart: CartModel): CartAction {
    return { type: CartActionType.FetchCartItems, payload: cart };
}
export function fetchCartItemsAction(cartItems: CartItemModel[]): CartAction {
    return { type: CartActionType.FetchCartItems, payload: cartItems };
}
export function addToCartAction(cartItem: CartItemModel): CartAction {
    return { type: CartActionType.AddToCart, payload: cartItem };
}
export function removeFromCartAction(itemId: string): CartAction {
    return { type: CartActionType.RemoveFromCart, payload: itemId };
}
export function updateCartItemAction(cartItem: CartItemModel): CartAction {
    return { type: CartActionType.UpdateCartItem, payload: cartItem };
}
export function deleteAllCartItemsAction(cartId: string): CartAction {
    return { type: CartActionType.DeleteAllCartItems, payload: cartId };
}

export function cartReducer(currentState = new CartState(), action: CartAction): CartState {

    const newState = { ...currentState };

    switch (action.type) {

        case CartActionType.FetchCart:
            newState.cart = action.payload;
            break;
        case CartActionType.FetchCartItems:
            newState.cartItems = action.payload;
            break;
        case CartActionType.AddToCart:
            newState.cartItems.push(action.payload);
            break;
        case CartActionType.RemoveFromCart:
            const indexToDelete = newState.cartItems.findIndex(item => item._id === action.payload);
            if(indexToDelete >= 0){
                newState.cartItems.splice(indexToDelete, 1);
            }
            break;
        case CartActionType.UpdateCartItem:
            const indexToUpdate = newState.cartItems.findIndex(item => item._id === action.payload._id);
            if(indexToUpdate >= 0){
                newState.cartItems[indexToUpdate] = action.payload;
            }
            break;
        case CartActionType.DeleteAllCartItems:
            newState.cartItems = [];
            break;
    }

    return newState;
}
