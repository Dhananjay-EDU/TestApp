import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LatestNewsPageRoutingModule } from './latest-news-routing.module';

import { LatestNewsPage } from './latest-news.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LatestNewsPageRoutingModule
  ],
  declarations: [LatestNewsPage]
})
export class LatestNewsPageModule {}
