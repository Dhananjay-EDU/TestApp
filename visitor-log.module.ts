import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitorLogPageRoutingModule } from './visitor-log-routing.module';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { VisitorLogPage } from './visitor-log.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitorLogPageRoutingModule
  ],
  declarations: [VisitorLogPage],
  providers: [SQLite]
})
export class VisitorLogPageModule {}
