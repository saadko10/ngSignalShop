import {Component, EventEmitter, Output} from '@angular/core';
import {Product} from "../../models/product.model";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './product-list.component.html',
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
