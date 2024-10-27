import { BehaviorSubject, Observable } from 'rxjs';
import { computed, Injectable, signal } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { map } from 'rxjs/operators';
import {Product} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class CartState {

  //Change to a signale of cart Items
  //Nb:  A signal must always have an intial value
  readonly cartItems = signal<CartItem[]>([]);



//Computed Signal of Total Items
  getTotalItems = computed(() => this.cartItems().reduce((sum, item) => sum +  item.quantity, 0) ) ;

// Computed Signal for cart total

  readonly total = computed(() => this.cartItems().reduce((sum, item) => sum + item.price * item.quantity, 0) ) ;

  // Method to add item to cart
  addToCart(product: Product): void {
    // const currentItems = this.cartItems$.value;
    // const existingItem = currentItems.find(item => item.id === product.id);

    // if (existingItem) {
    //   const updatedItems = currentItems.map(item =>
    //     item.id === product.id
    //       ? { ...item, quantity: item.quantity + 1 }
    //       : item
    //   );
    //   this.cartItems$.next(updatedItems);
    // } else {
    //   this.cartItems$.next([...currentItems, { ...product, quantity: 1 }]);
    // }
  }

  // Method to update item quantity
  updateQuantity(itemId: number, quantity: number): void {
    // const currentItems = this.cartItems$.value;
    // const updatedItems = currentItems.map(item =>
    //   item.id === itemId ? { ...item, quantity } : item
    // );
    // this.cartItems$.next(updatedItems);
  }

  // Method to remove item from cart
  removeItem(itemId: number): void {
    // const filteredItems = this.cartItems$.value.filter(item => item.id !== itemId);
    // this.cartItems$.next(filteredItems);
  }
}
