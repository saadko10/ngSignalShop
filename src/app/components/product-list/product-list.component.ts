import {Component, EventEmitter, Output} from '@angular/core';
import {Product} from "../../models/product.model";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  template: `
    <div class="products">
      <!-- Two-way binding example for product filtering -->
      <input [(ngModel)]="searchTerm"
             placeholder="Search products..."
             (ngModelChange)="filterProducts()">

      <div *ngFor="let product of filteredProducts" class="product-card">
        <h3>{{ product.name }}</h3>
        <p>Price: {{ product.price }}</p>
        <!-- Event binding with @Output -->
        <button (click)="onAddToCart(product)">Add to Cart</button>
      </div>
    </div>
  `,
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  // Available products
  products: Product[] = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Smartphone', price: 699 },
    { id: 3, name: 'Headphones', price: 199 }
  ];

  // Filtered products array
  filteredProducts: Product[] = this.products;

  // NgModel for search input
  searchTerm: string = '';

  // Output event emitter for cart additions
  @Output() addToCart = new EventEmitter<Product>();

  onAddToCart(product: Product): void {
    this.addToCart.emit(product);
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
