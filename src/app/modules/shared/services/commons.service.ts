import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable()
export class CommonsService {
	loading: any;
	alert: any;
	constructor(
		private loadingCtrl: LoadingController,
		private alertController: AlertController,
		private router: Router
	) {}
	/**
	 * Navigate to internal
	 * @param url
	 */
	async navigate(url: string, params?: any, fragment?: string): Promise<void> {
		if (fragment) {
			await this.router.navigateByUrl('/home#' + fragment);
		} else {
			await this.router.navigate(['/' + url], {
				state: params ?? {}
			});
		}
	}

	async showLoading(message: string): Promise<void> {
		this.loading = await this.loadingCtrl.create({
			message
		});
		this.loading.present();
	}

	dismissAlert(): void {
		this.alert.dismiss();
	}

	async showAlert(message: string, header?: string, cssClass?: string): Promise<void> {
		this.alert = await this.alertController.create({
			message,
      header,
			buttons: ['Aceptar'],
      cssClass
		});
		this.alert.present();
	}
	dismissLoading(): void {
		this.loading.dismiss();
	}

	getAuthenticationValidation(): string {
		return sessionStorage.getItem('auth');
	}
}
