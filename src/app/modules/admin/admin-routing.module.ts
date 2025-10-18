import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
	},
	{
		path: 'home',
		loadChildren: () => import('./modules/home/home.module').then((m) => m.HomePageModule)
	},
	{
		path: 'visitor-parking-spots',
		loadChildren: () =>
			import('./modules/visitor-parking-spots/visitor-parking-spots.module').then(
				(m) => m.VisitorParkingSpotsPageModule
			)
	},
	{
		path: 'check-residential-user',
		loadChildren: () =>
			import('./modules/check-residential-user/check-residential-user.module').then(
				(m) => m.CheckResidentialUserPageModule
			)
	},  {
    path: 'lottery',
    loadChildren: () => import('./modules/lottery/lottery.module').then( m => m.LotteryPageModule)
  }

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule {}
