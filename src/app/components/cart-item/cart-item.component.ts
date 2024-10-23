import {Component, EventEmitter, Input, Output} from '@angular/core';
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
      <span>{{ item.name }}</span>
      <!-- Two-way binding for quantity -->
      <input type="number"
             [(ngModel)]="item.quantity"
             (ngModelChange)="onQuantityChange($event)" min="1">
      <span>{{ item.price * item.quantity }}</span>
      <button (click)="onRemove()">Remove</button>
    </div>
  `,
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  @Input() item!: CartItem;
  @Output() quantityChange = new EventEmitter<{ id: number, quantity: number }>();
  @Output() remove = new EventEmitter<number>();

  onQuantityChange(quantity: number): void {
    this.quantityChange.emit({ id: this.item.id, quantity });
  }

  onRemove(): void {
    this.remove.emit(this.item.id);
  }
}
