import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartItem} from "../../models/cart-item.model";
import {Subscription} from "rxjs";
import {CartState} from "../../services/cart.state";
import {CartItemComponent} from "../cart-item/cart-item.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    CartItemComponent,
    CommonModule
  ],
  template: `
    <div class="cart">
      <h2>Shopping Cart</h2>
      <ng-container *ngIf="cartItems.length; else emptyCart">
        <app-cart-item
          *ngFor="let item of cartItems"
          [item]="item"
          (quantityChange)="onQuantityChange($event)"
          (remove)="onRemoveItem($event)">
        </app-cart-item>
        <div class="total">Total: {{ cartTotal }}</div>
      </ng-container>
      <ng-template #emptyCart>
        <p>Your cart is empty</p>
      </ng-template>
    </div>
  `,
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
