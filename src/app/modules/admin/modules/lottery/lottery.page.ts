import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { CommonsService } from '../../../shared/services/commons.service';
import { ParkingSpotsService } from '../../services/parking-spots.service';

@Component({
	selector: 'kot-lottery',
	templateUrl: './lottery.page.html',
	styleUrls: ['./lottery.page.scss']
})
export class LotteryPage  {
	selectedDate: string | null = null;

	minDate: string;
	currentLottery: any;
	constructor(
		private readonly commonsService: CommonsService,
		private alertController: AlertController,
		private readonly parkingSpotsService: ParkingSpotsService
	) {}

	async ionViewWillEnter(): Promise<void> {
		this.minDate = this.getTodayLocalISO();
    await this.getCurrentLottery();
	}

	async getCurrentLottery() {
		try {
			await this.commonsService.showLoading('Buscando sorteos...');
			const lotteries = await firstValueFrom(this.parkingSpotsService.getLottery());
			if (lotteries.length > 0) {
				this.currentLottery = lotteries[0];
			}
		} catch (error) {
		} finally {
			this.commonsService.dismissLoading();
		}
	}
	private getTodayLocalISO(): string {
		const now = new Date();

		// Obtener las partes de la fecha local
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, '0');
		const day = String(now.getDate()).padStart(2, '0');

		const hours = String(now.getHours()).padStart(2, '0');
		const minutes = String(now.getMinutes()).padStart(2, '0');
		const seconds = String(now.getSeconds()).padStart(2, '0');

		// Construir la cadena en formato 'YYYY-MM-DDTHH:MM:SS'
		return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
	}

	/**
	 * Captura el cambio de fecha del ion-datetime.
	 * @param event El evento emitido por ion-datetime
	 */
	onDateChange(event: any) {
		this.selectedDate = event.detail.value;
		console.log('Fecha seleccionada:', this.selectedDate);
	}

	/**
	 * Función que se llama al presionar "Confirmar".
	 * Aquí se colocaría la lógica para enviar la fecha a un servicio.
	 */
	async confirmDate() {
		if (this.selectedDate) {
			const alert = await this.alertController.create({
				header: 'Creacion de sorteo ',
				message: '¿Desea crear este sorteo?' + new Date(this.selectedDate).toLocaleString(),
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
							await this.createParkingSpotLottery(new Date(this.selectedDate).toISOString());
						}
					}
				]
			});

			await alert.present();
		} else {
			console.log('Advertencia: No se ha seleccionado una fecha.');
		}
	}

	async createParkingSpotLottery(executionDate: string) {
		try {
			await this.commonsService.showLoading('Creando sorteo...');
			await firstValueFrom(this.parkingSpotsService.lottery(executionDate));
			await this.commonsService.showAlert(
				'✅ FECHA CONFIRMADA: ' + new Date(this.selectedDate).toLocaleString(),
				'Sorteo creado'
			);
			this.commonsService.navigate('admin/home');
		} catch (error) {
			await this.commonsService.showAlert(
				'No se pudo crear el sorteo porque ya existe uno ',
				'Sorteo de parqueadero',
				'custom-danger-alert'
			);
		} finally {
			this.commonsService.dismissLoading();
		}
	}
	/**
	 * Función que se llama al presionar "Cancelar".
	 */
	cancel() {
		console.log('❌ CANCELADO: La selección de fecha ha sido cancelada.');
		this.selectedDate = null; // Limpia la selección al cancelar
	}
}
