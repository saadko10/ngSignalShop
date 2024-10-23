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
      <ng-container *ngIf="cartState.items().length; else emptyCart">
        <app-cart-item
          *ngFor="let item of cartState.items()"
          [item]="item"
          (quantityChange)="onQuantityChange($event)"
          (remove)="onRemoveItem($event)">
        </app-cart-item>
        <div class="total">Total: {{ cartState.total() }}</div>
      </ng-container>
      <ng-template #emptyCart>
        <p>Your cart is empty</p>
      </ng-template>
    </div>
  `,
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {
  // Injection du service
  constructor(public cartState: CartState) {}

  onQuantityChange(event: { id: number, quantity: number }): void {
    this.cartState.updateQuantity(event.id, event.quantity);
  }

  onRemoveItem(itemId: number): void {
    this.cartState.removeItem(itemId);
  }
}
