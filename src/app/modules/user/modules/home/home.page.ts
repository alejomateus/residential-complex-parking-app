import { Component, OnInit, signal } from '@angular/core';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { CommonsService } from '../../../shared/services/commons.service';
@Component({
	selector: 'kot-home',
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
	qrCodeData = signal<string>('');
	constructor(
		private commonsService: CommonsService,
		private authenticationService: AuthenticationService
	) {}
	async ngOnInit() {
		await this.getQrInfo();
	}

	async startScan() {
		const { camera } = await BarcodeScanner.requestPermissions();
		if (camera !== 'granted') {
			console.log('Permiso de cámara denegado');
			return;
		}
		const result = await BarcodeScanner.scan();
		console.log(result);
	}

	async getQrInfo(): Promise<void> {
		this.qrCodeData.set(btoa((await this.authenticationService.getCurrentAuthenticatedUser())?.user?.id));
	}
}
