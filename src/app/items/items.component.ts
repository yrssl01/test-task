import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/assets/product';
import { Discount } from 'src/assets/discount';
import { ProductService } from '../shared/services/product.service';
import { BannerService } from '../shared/services/banner.service';
import { Subscription } from 'rxjs';
import { CartService } from '../shared/services/cart.service';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  productsUpdated: Subscription;
  constructor(private productService: ProductService, 
              private bannerService: BannerService,
              private cartService: CartService) { }
  
  ngOnDestroy(): void {
    this.bannerService.set(false);
    this.productsUpdated.unsubscribe();
  }

  ngOnInit(): void {
    this.productsUpdated = this.productService.getProducts()
      .subscribe((result: Product[]) => {
        if (result) {
          this.products = result;
          console.log(this.products)
          this.bannerService.set(true)
        }
      })
  }

  addToCart(item: Product) {
    this.cartService.addProductToStorage(item);
  }
  

  deleteFromCart(item: Product) {
    this.cartService.deleteProductFromStorage(item);
  }

  isInCart(item: Product) {
    return this.cartService.isInStorage(item);
  }



}
