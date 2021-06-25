import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitorLogPage } from './visitor-log.page';

const routes: Routes = [
  {
    path: '',
    component: VisitorLogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitorLogPageRoutingModule {}
