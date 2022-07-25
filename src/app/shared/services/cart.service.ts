import { Injectable } from '@angular/core';
import { Product } from 'src/assets/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }
  items: Product[] = [];

  addProductToStorage(item: Product) {
    item.quantity = 1;
    this.items.push(item);
    this.saveStorage();
  }

  calcSubtotal(item: Product): number {
    this.items = this.getAllFromStorage();
    let subtotal = 0;
    if (typeof item.discount !== "undefined") {
      if (item.discount.exact) 
        subtotal = subtotal + (item.price-item.discount.exact)*item.quantity
      if (item.discount.percent)
        subtotal += (item.discount.percent/100 * item.price)*item.quantity;
    }
    else {
      subtotal += item.price*item.quantity;
    }
    return subtotal;
  }

  calcTotal(): number {
    let total = 0;
    this.items.forEach(item => {
      total += this.calcSubtotal(item);
    })
    return total;
  }

  countStorage(): number {
    let count = this.getAllFromStorage().length;
    return count;
  }

  incProductQuantity(item: Product) {
    let product = this.getFromStorage(item)[0];
    product.quantity++;
    this.saveStorage();
  }

  decProductQuantity(item: Product) {
    let product = this.getFromStorage(item)[0];
    product.quantity--;
    this.checkStorage(product);
    this.saveStorage();
  }

  saveStorage() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  checkStorage(item: Product) {
    if (item.quantity<1) {
      this.deleteProductFromStorage(item)
    } 
  }

  deleteProductFromStorage(item: Product) {
    const index = this.items.findIndex(x => x.id === item.id);

    if  (index > -1) { 
      this.items.splice(index, 1) 
      this.saveStorage();
    }

  }

  getAllFromStorage(): Product[] {
    let products = localStorage.getItem('cart');
    this.items = JSON.parse(products || '[]');
    return this.items;
  }

  getFromStorage(item: Product) {
    this.getAllFromStorage();
    return this.items.filter(x => x.id === item.id)
  }

  isInStorage(item: Product): boolean {
    this.getAllFromStorage();
    return this.items.findIndex(x => x.id === item.id) > -1;
  }



}
