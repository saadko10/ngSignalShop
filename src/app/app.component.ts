import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CartState} from "./services/cart.state";
import {Product} from "./models/product.model";
import {ProductListComponent} from "./components/product-list/product-list.component";
import {ShoppingCartComponent} from "./components/shopping-cart/shopping-cart.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductListComponent, ShoppingCartComponent,FormsModule],
  template: `
        <div class="container-fluid">
      <nav class="navbar navbar-dark bg-primary mb-4">
        <div class="container">
          <a class="navbar-brand">
            <i class="bi bi-shop"></i> Ma Boutique en Ligne
          </a>
        </div>
      </nav>

      <div class="container">
        <div class="row">
          <div class="col-md-8">
          <input class="mb-3"
            [(ngModel)]="searchTerm"
            placeholder="Search products..."
          />
          <app-product-list [searchTerm]="searchTerm"
          (addToCart)="onAddToCart($event)">
        </app-product-list>
          </div>
          <div class="col-md-4">
            <app-shopping-cart></app-shopping-cart>
          </div>
        </div>
      </div>
    </div>`,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'signal-app';
  searchTerm = '';
  constructor(private cartState: CartState) {}

  onAddToCart(product: Product): void {
    this.cartState.addToCart(product);
  }
}
