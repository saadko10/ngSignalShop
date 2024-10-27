import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartItem} from "../../models/cart-item.model";
import {Subscription} from "rxjs";
import {CartState} from "../../services/cart.state";
import {CartItemComponent} from "../cart-item/cart-item.component";
import {CommonModule, CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    CartItemComponent,
    CommonModule,
    CurrencyPipe
  ],
  template: `
<div class="card">
  <div class="card-header bg-primary text-white">
    <h5 class="card-title mb-0">
      <i class="bi bi-cart3">
      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    {{totalItems}}
  </span>
      </i> Panier
    </h5>
  </div>
  <div class="card-body">
    <ng-container *ngIf="cartItems.length; else emptyCart">
      <div class="list-group list-group-flush">
        <app-cart-item
          *ngFor="let item of cartItems"
          [item]="item"
          (quantityChange)="onQuantityChange($event)"
          (remove)="onRemoveItem($event)">
        </app-cart-item>
      </div>
      <div class="mt-3 text-end">
        <h5>Total: {{ cartTotal | currency:'EUR' }}</h5>
      </div>
      <button class="btn btn-success w-100 mt-3">
        <i class="bi bi-credit-card"></i> Commander
      </button>
    </ng-container>

    <ng-template #emptyCart>
      <div class="text-center py-4">
        <i class="bi bi-cart-x fs-1 text-muted"></i>
        <p class="text-muted mt-2">Votre panier est vide</p>
      </div>
    </ng-template>
  </div>
</div>
  `,
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  cartTotal: number = 0;
  totalItems:number = 0;
  private subscriptions = new Subscription();

  constructor(private cartState: CartState) {}

  ngOnInit(): void {
    // Subscribe to cart items updates
    this.subscriptions.add(
      this.cartState.items$.subscribe(items => {
        this.cartItems = items;
        this.totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
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
