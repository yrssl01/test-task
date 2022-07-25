import { Component, OnInit } from '@angular/core';
import { BannerService } from './shared/services/banner.service';
import { CartService } from './shared/services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'shop';

  constructor(public bannerService: BannerService,
              private cartService: CartService) {

  }
  ngOnInit(): void {
  }
  
  cartItems(): number {
    return this.cartService.countStorage();
  }

}
