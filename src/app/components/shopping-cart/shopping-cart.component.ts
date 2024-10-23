import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartItem} from "../../models/cart-item.model";
import {Subscription} from "rxjs";
import {CartState} from "../../services/cart.state";
import {CartItemComponent} from "../cart-item/cart-item.component";

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    CartItemComponent
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  cartTotal: number = 0;
  private subscriptions = new Subscription();

  constructor(private cartState: CartState) {}

  ngOnInit(): void {
    // Subscribe to cart items updates
    this.subscriptions.add(
      this.cartState.items$.subscribe(items => {
        this.cartItems = items;
      })
    );

    // Subscribe to cart total updates
    this.subscriptions.add(
      this.cartState.total$.subscribe(total => {
        this.cartTotal = total;
      })
    );
  }

  onQuantityChange(event: { id: number, quantity: number }): void {
    this.cartState.updateQuantity(event.id, event.quantity);
  }

  onRemoveItem(itemId: number): void {
    this.cartState.removeItem(itemId);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
