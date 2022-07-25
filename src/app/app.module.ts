import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from './shared/services/config.service';
import { BannersComponent } from './banners/banners.component';
import { ItemsModule } from './items/items.module';
import { CartModule } from './cart/cart.module';
import { ItemDetailsModule } from './item-details/item-details.module';
import { CartService } from './shared/services/cart.service';
import { BannerService } from './shared/services/banner.service';
import { ProductService } from './shared/services/product.service';


export function initApp(configService: ConfigService) {
  return () => {
    return configService.load();
  }
}

@NgModule({
  declarations: [
    AppComponent,
    BannersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ItemsModule,
    CartModule,
    ItemDetailsModule
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [ConfigService],
      multi: true
    },
    CartService,
    BannerService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
