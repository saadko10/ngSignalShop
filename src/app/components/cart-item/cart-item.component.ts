import {Component, EventEmitter, input, Input, Output} from '@angular/core';
import {CartItem} from "../../models/cart-item.model";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  template: `
    <div class="cart-item">
      <!-- Utilisation du signal input avec () -->
      <span>{{ item().name }}</span>
      <!-- Two-way binding for quantity -->
      <input type="number"
             [(ngModel)]="item().quantity"
             (ngModelChange)="onQuantityChange($event)" min="1">
      <span>{{ item().price * item().quantity }}</span>
      <button (click)="onRemove()">Remove</button>
    </div>
  `,
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  // Conversion de @Input en signal input

  item = input.required<CartItem>();

  @Output() quantityChange = new EventEmitter<{ id: number, quantity: number }>();
  @Output() remove = new EventEmitter<number>();

  onQuantityChange(quantity: number): void {
    this.quantityChange.emit({ id: this.item().id, quantity });
  }

  onRemove(): void {
    this.remove.emit(this.item().id);
  }
}
