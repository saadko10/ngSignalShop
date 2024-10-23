import { Injectable, computed, signal } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartState {
  // Remplacer BehaviorSubject par un signal
  private cartItems = signal<CartItem[]>([]);

  // Exposer un signal en lecture seule pour les composants
  readonly items = this.cartItems.asReadonly();

  // Remplacer l'observable total$ par un signal calculé
  readonly total = computed(() => {
    return this.items().reduce((sum, item) =>
      sum + item.price * item.quantity, 0
    );
  });

  // Method to add item to cart
  addToCart(product: Product): void {
    const currentItems = this.items();
    const existingItem = currentItems.find(item => item.id === product.id);

    if (existingItem) {
      // Mise à jour avec mutation via update
      this.cartItems.update(items =>
        items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Ajout avec mutation via update
      this.cartItems.update(items =>
        [...items, { ...product, quantity: 1 }]
      );
    }
  }

  // Méthode pour mettre à jour la quantité
  updateQuantity(itemId: number, quantity: number): void {
    this.cartItems.update(items =>
      items.map(item =>
        item.id === itemId
          ? { ...item, quantity }
          : item
      )
    );
  }

  // Méthode pour supprimer un article
  removeItem(itemId: number): void {
    this.cartItems.update(items =>
      items.filter(item => item.id !== itemId)
    );
  }
}
