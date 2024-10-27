import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from "../../models/cart-item.model";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  template: `

    <div class="cart-item list-group-item d-flex justify-content-between align-items-center py-3">
    <span class="fw-bold">{{ item.name }}</span>
    <div class="d-flex align-items-center gap-3">
            <!-- Two-way binding for quantity -->

    <input type="number"
               class="form-control form-control-sm w-auto"
               [(ngModel)]="item.quantity"
               (ngModelChange)="onQuantityChange($event)"
               min="1">
               <span class="fw-bold text-primary">{{ item.price * item.quantity }}</span>
               <button class="btn btn-outline-danger btn-sm" (click)="onRemove()">Supprimer</button>

    </div>
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
