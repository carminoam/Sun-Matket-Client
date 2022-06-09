import { CartItemModel } from './../models/cart-item.model';


export class CartState {
    public cartId: string;
    public cart: CartItemModel[] = [];
}

export enum CartActionType {
    FetchCartId = "FetchCartId",
    FetchCartItems = "FetchCartItems",
    AddToCart = "AddToCart",
}

export interface CartAction {
    type: CartActionType;
    payload: any;
}

export function fetchCartId(id : string): CartAction {
    return { type: CartActionType.FetchCartItems, payload: id };
}
export function fetchCartItemsAction(cartItems: CartItemModel[]): CartAction {
    return { type: CartActionType.FetchCartItems, payload: cartItems };
}
export function addToCartAction(cartItem: CartItemModel): CartAction {
    return { type: CartActionType.AddToCart, payload: cartItem };
}

export function cartReducer(currentState = new CartState(), action: CartAction): CartState {

    const newState = { ...currentState };

    switch (action.type) {

        case CartActionType.FetchCartId:
            newState.cartId = action.payload;
            break;
        case CartActionType.FetchCartItems:
            newState.cart = action.payload;
            break;
        case CartActionType.AddToCart:
            newState.cart.push(action.payload);
            break;
    }

    return newState;
}
