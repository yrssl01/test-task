import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/assets/product';
import { ProductService } from '../shared/services/product.service';
import { BannerService } from '../shared/services/banner.service';
import { CartService } from '../shared/services/cart.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit, OnDestroy {

  product: Product;
  quantity: number;

  constructor(private bannerService: BannerService, 
          private route: ActivatedRoute, 
          private productService: ProductService,
          private cartService: CartService) { }

  ngOnDestroy(): void {
    this.bannerService.set(false);
    
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const itemIdFromRoute = String(routeParams.get('itemId'));
    this.productService.getProduct(itemIdFromRoute).subscribe((res: Product) => {
      this.product = res;
      this.bannerService.set(true);
      this.count(this.product);
      console.log(this.product);
    })
  }

  isInCart(item: Product): boolean {
    return this.cartService.isInStorage(item);
  }

  addToCart(item: Product) {
    this.cartService.addProductToStorage(item);
    this.count(item);
  }

  plus(item: Product) {
    this.cartService.incProductQuantity(item);
    this.count(item);
  }

  minus(item: Product) {
    this.cartService.decProductQuantity(item);
    this.count(item);
  }

  count(item: Product) {
    this.quantity = this.cartService.getFromStorage(item)[0].quantity;
  }

}
