import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [ /* { path: '', redirectTo: 'items', pathMatch: 'full'},*/
                          { path: 'items', loadChildren: () => import('./items/items.module').then(m => m.ItemsModule) }, 
                         { path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule) }, 
                         { path: 'items/:itemId', loadChildren: () => import('./item-details/item-details.module').then(m => m.ItemDetailsModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
