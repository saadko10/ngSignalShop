import {Component, computed, EventEmitter, input, Output, signal} from '@angular/core';
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
      <input [ngModel]="searchTerm()"
             placeholder="Search products..."
             (ngModelChange)="updateSearch($event)">

      <div *ngFor="let product of filteredProducts()" class="product-card">
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
  // Signal input pour la liste des produits
  products = input<Product[]>([
    { id: 1, name: 'Ordinateur Portable', price: 999 },
    { id: 2, name: 'Smartphone', price: 699 },
    { id: 3, name: 'Écouteurs', price: 199 }
  ]);


  // Signal pour le terme de recherche
  protected searchTerm = signal('');

  // Output event emitter for cart additions
  @Output() addToCart = new EventEmitter<Product>();

  onAddToCart(product: Product): void {
    this.addToCart.emit(product);
  }
  protected filteredProducts = computed(() => {
    const searchTerm = this.searchTerm().toLowerCase();
    return this.products().filter(product =>
      product.name.toLowerCase().includes(searchTerm)
    );
  });
  updateSearch(term: string): void {
    this.searchTerm.set(term);
  }
}
