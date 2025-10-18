import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { CommonsService } from '@shared/services/commons.service';
import { firstValueFrom } from 'rxjs';
import { ParkingSpotsService } from '../../services/parking-spots.service';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'kot-check-residential-user',
	templateUrl: './check-residential-user.page.html',
	styleUrls: ['./check-residential-user.page.scss']
})
export class CheckResidentialUserPage implements OnInit {
	constructor(
		private readonly userService: UserService,
		private readonly parkingSpotsService: ParkingSpotsService,

		private commonsService: CommonsService
	) {}
	ngOnInit() {}

	async startScan(): Promise<any> {
		const { camera } = await BarcodeScanner.requestPermissions();
		if (camera !== 'granted') {
			this.commonsService.showAlert(`Por favor asigna los permisos para poder escanear`, 'Permiso de cámara denegado');

			return;
		}
		const result = await BarcodeScanner.scan();
		await this.checkUser(atob(result.barcodes[0].rawValue));
	}

	async checkUser(userId: string): Promise<void> {
		try {
			this.commonsService.showLoading('Verificando informacion del codigo...');
			const user = await firstValueFrom(this.userService.getUserById(userId));
			const parkingSpots: any[] = await firstValueFrom(this.parkingSpotsService.getParkingSpotsByUserId(userId));
			if (parkingSpots.length === 0) {
        this.commonsService.showAlert(
          `${user.name} ${user.lastName}, aun no tienes parqueadero asignado`,
					'Bienvenido'
				);
			} else {
        this.commonsService.showAlert(`${user.name} ${user.lastName} tu parqueadero asignado es ${parkingSpots[0].name}`, 'Bienvenido');
			}
		} catch (error) {
			await this.commonsService.showAlert(
				'No pudimos validar el usuario o no existe actualmente ',
				'Verificacion de residente no exitosa',
				'custom-danger-alert'
			);
		} finally {
			this.commonsService.dismissLoading();
		}
	}
}
