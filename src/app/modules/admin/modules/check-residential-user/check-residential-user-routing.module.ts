import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckResidentialUserPage } from './check-residential-user.page';

const routes: Routes = [
  {
    path: '',
    component: CheckResidentialUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckResidentialUserPageRoutingModule {}
