import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemDetailsRoutingModule } from './item-details-routing.module';
import { ItemDetailsComponent } from './item-details.component';


@NgModule({
  declarations: [
    ItemDetailsComponent
  ],
  imports: [
    CommonModule,
    ItemDetailsRoutingModule
  ]
})
export class ItemDetailsModule { }
