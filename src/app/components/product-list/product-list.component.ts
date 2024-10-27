import {
  Component,
  computed,
  effect,
  EventEmitter,
  input,
  Input,
  OnChanges,
  Output,
  signal,
  SimpleChanges,
  WritableSignal,
} from '@angular/core';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="card">
      <div class="card-header bg-white">
        <h5 class="card-title mb-0">Produits</h5>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <!-- Two-way binding example for product filtering -->

          <div class="row row-cols-1 row-cols-md-2 g-4">
            <div class="col" *ngFor="let product of filteredProducts()">
              <div class="card h-100">
                <div class="card-body">
                  <h5 class="card-title">{{ product.name }}</h5>
                  <p class="card-text">
                    <span class="badge bg-primary">
                      {{ product.price | currency : 'EUR' }}
                    </span>
                  </p>
                  <!-- Event binding with @Output -->
                  <button
                    class="btn btn-outline-primary"
                    (click)="onAddToCart(product)"
                  >
                    <i class="bi bi-cart-plus"></i> Ajouter au Panier
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
constructor(){
  //Uncomment this to log searchTerm value changes
  // effect(()=> {
  //   console.log(this.searchTerm());

  // })
}

  searchTerm = input.required({
    transform: (value:string) => value.toLocaleLowerCase(),
    alias: 'listCriteria'
  }
  );
  // Available products
  products = signal<Product[]>([
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Smartphone', price: 699 },
    { id: 3, name: 'Headphones', price: 199 },
  ]);

  // Filtered products array
  filteredProducts = computed(() => this.products().filter((product) => product.name.toLocaleLowerCase().includes(this.searchTerm())));

  // Output event emitter for cart additions
  @Output() addToCart = new EventEmitter<Product>();

  onAddToCart(product: Product): void {
    this.addToCart.emit(product);
  }
}
