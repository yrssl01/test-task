import { Component, OnDestroy, OnInit } from '@angular/core';
import { BannerService } from '../shared/services/banner.service';
import { CartService } from '../shared/services/cart.service';
import { Product } from 'src/assets/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  product: Product;
  quantity: number;
  products: Product[] = [];
  total: number;

  constructor(private bannerService: BannerService,
              private cartService: CartService) { }
  ngOnDestroy(): void {
    this.bannerService.set(false);
  }

  ngOnInit(): void {
    this.products = this.cartService.getAllFromStorage();
    this.bannerService.set(true);
  }

  isCartEmpty(): boolean {
    return this.cartService.getAllFromStorage().length < 1;
  }

  count(item: Product): number {
    this.quantity = this.cartService.getFromStorage(item)[0].quantity;
    return this.quantity;
  }

  plus(item: Product) {
    this.cartService.incProductQuantity(item);
    this.products = this.cartService.getAllFromStorage();
    this.subTotalPrice(item);
    this.totalPrice();
  }

  minus(item: Product) {
    this.cartService.decProductQuantity(item);
    this.products = this.cartService.getAllFromStorage();
    this.subTotalPrice(item);
    this.totalPrice();
  }

  subTotalPrice(item: Product):number {  
    return this.cartService.calcSubtotal(item);
  }

  totalPrice(): number {
    return this.cartService.calcTotal();
  }
}
