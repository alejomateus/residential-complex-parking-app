import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from './guards/admin.guard';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'sign-in',
		pathMatch: 'full'
	},
	{
		path: 'sign-in',
		loadChildren: () => import('@sign-in/sign-in.module').then((m) => m.SignInPageModule)
	},
	{
		path: 'admin',
		loadChildren: () => import('@admin/admin.module').then((m) => m.AdminModule),
		canActivate: [adminGuard]
	},
	{
		path: 'user',
		loadChildren: () => import('@user/user.module').then((m) => m.UserModule)	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			useHash: true,
			scrollPositionRestoration: 'enabled'
		})
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
