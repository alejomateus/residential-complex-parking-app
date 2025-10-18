import { Component, OnInit, signal } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { CommonsService } from '@shared/services/commons.service';
import { firstValueFrom } from 'rxjs';
import { IParkingSpots } from '../../models/parking-spots';
import { FeeService } from '../../services/fee.service';
import { ParkingSpotsService } from '../../services/parking-spots.service';
import { AssignVisitorParkingSpotModalComponent } from './components/assign-visitor-parking-spot-modal/assign-visitor-parking-spot-modal.component';

@Component({
	selector: 'kot-visitor-parking-spots',
	templateUrl: './visitor-parking-spots.page.html',
	styleUrls: ['./visitor-parking-spots.page.scss']
})
export class VisitorParkingSpotsPage implements OnInit {
	visitorParkingSpots = signal<IParkingSpots[]>([]);
	selectedParkingSpot: IParkingSpots;
	constructor(
		private readonly parkingSpotsService: ParkingSpotsService,
		private modalCtrl: ModalController,
		private commonsService: CommonsService,
		private readonly feeService: FeeService,
		private alertController: AlertController
	) {}

	async openModal(): Promise<void> {
		const modal = await this.modalCtrl.create({
			component: AssignVisitorParkingSpotModalComponent,
			componentProps: {
				selectedParkingSpot: this.selectedParkingSpot,
				title: 'Asignacion de parqueadero ' + this.selectedParkingSpot.name
			},
			cssClass: 'my-centered-modal',
			showBackdrop: true
		});
		modal.present();
		const { role } = await modal.onWillDismiss();
		if (role == 'confirm') {
			await this.getVisitorParkingSpots();
		}
	}

	async ngOnInit(): Promise<void> {
		await this.commonsService.showLoading('Cargando espacios');
		await this.getVisitorParkingSpots();
	}

	async getVisitorParkingSpots(): Promise<void> {
		try {
			this.visitorParkingSpots.set(await firstValueFrom(this.parkingSpotsService.getVisitorParkingSpots()));
		} catch (error) {
		} finally {
			this.commonsService.dismissLoading();
		}
	}

	async selectParkingSpot(parkingSpot: IParkingSpots): Promise<void> {
		if (parkingSpot.available) {
			this.selectedParkingSpot = parkingSpot;
			await this.openModal();
		} else {
			await this.releaseSpotAlert(parkingSpot.id);
		}
	}

	async releaseSpotAlert(parkingSlotId: string): Promise<any> {
		const alert = await this.alertController.create({
			header: 'Liberacion de espacio ',
			message: '¿Desea liberar este espacio?',
			buttons: [
				{
					text: 'Cancelar',
					role: 'cancel',
					cssClass: 'danger',
					handler: () => {
						console.log('Alerta cancelada por el usuario.');
					}
				},
				{
					text: 'Confirmar',
					role: 'confirm',
					handler: async () => {
						await this.releaseSpot(parkingSlotId);
					}
				}
			]
		});

		await alert.present();
	}
	async releaseSpot(parkingSlotId: string): Promise<any> {
		try {
			await this.commonsService.showLoading('Liberando espacio');
			const data = await firstValueFrom(this.feeService.updateFee(parkingSlotId));
			await this.commonsService.showAlert(
        'Total: ' + Math.round(data.total),
				'Espacio liberado',
			);
			await this.getVisitorParkingSpots();
		} catch (error) {
		} finally {
			this.commonsService.dismissLoading();
		}
	}
}
