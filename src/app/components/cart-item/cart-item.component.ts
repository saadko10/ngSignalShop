import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CartItem} from "../../models/cart-item.model";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './cart-item.component.html',
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
