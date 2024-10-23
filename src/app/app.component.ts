import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CartState} from "./services/cart.state";
import {Product} from "./models/product.model";
import {ProductListComponent} from "./components/product-list/product-list.component";
import {ShoppingCartComponent} from "./components/shopping-cart/shopping-cart.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductListComponent, ShoppingCartComponent],
  template: `
    <div class="container">
      <h1>Online Store</h1>
      <div class="layout">
        <app-product-list
          (addToCart)="onAddToCart($event)">
        </app-product-list>
        <app-shopping-cart></app-shopping-cart>
      </div>
    </div>`,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'signal-app';
  constructor(private cartState: CartState) {}

  onAddToCart(product: Product): void {
    this.cartState.addToCart(product);
  }
}
