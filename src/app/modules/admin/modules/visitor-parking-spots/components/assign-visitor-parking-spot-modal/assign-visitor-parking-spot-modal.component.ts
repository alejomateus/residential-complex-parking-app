import { Component, Input, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CommonsService } from '@shared/services/commons.service';
import { firstValueFrom } from 'rxjs';
import { FeeValidationMessages } from '../../../../models/fee';
import { IParkingSpots } from '../../../../models/parking-spots';
import { FeeService } from '../../../../services/fee.service';

@Component({
	selector: 'kot-assign-visitor-parking-spot-modal',
	templateUrl: './assign-visitor-parking-spot-modal.component.html',
	styleUrls: ['./assign-visitor-parking-spot-modal.component.scss']
})
export class AssignVisitorParkingSpotModalComponent implements OnInit {
	@Input() selectedParkingSpot: IParkingSpots;
	@Input() title: string;

	public readonly signInValidationMessages = signal<FeeValidationMessages>({
		licensePlate: [
			{ type: 'required', message: 'Este campo es requerido' },
			{ type: 'pattern', message: 'No es una placa válida' }
		],
		phone: [
			{ type: 'required', message: 'Este campo es requerido' },
			{ type: 'pattern', message: 'La telefono no es válido' }
		]
	});

	public assignSpotForm = new FormGroup({
		licensePlate: new FormControl('KFT829', {
			nonNullable: true,
			validators: [Validators.required, Validators.pattern(/^[a-zA-Z]{3}\d{2}[a-zA-Z0-9]$/)]
		}),
		phone: new FormControl('3143720783', {
			nonNullable: true,
			validators: [Validators.required, Validators.pattern(/^3\d{9}$/)]
		}),
		observations: new FormControl('', {
			nonNullable: false,
			validators: []
		})
	});
	constructor(
		private readonly feeService: FeeService,
		private commonsService: CommonsService,
		private modalCtrl: ModalController
	) {}

	ngOnInit() {}

	shouldShowError(formControlName: string): boolean {
		return (
			this.assignSpotForm.controls[formControlName].invalid &&
			(this.assignSpotForm.controls[formControlName].dirty || this.assignSpotForm.controls[formControlName].touched)
		);
	}

	async assignSpot(): Promise<any> {
		try {
      await this.commonsService.showLoading("Asignando espacio");
			await firstValueFrom(
				this.feeService.createFee({ parkingSlotId: this.selectedParkingSpot.id, ...this.assignSpotForm.getRawValue() })
			);
      await this.commonsService.showAlert('Espacio asignado');
			return await this.modalCtrl.dismiss(null, 'confirm');
		} catch (error) {
			await this.commonsService.showAlert(
				'No se pudo asignar el parqueadero, intenta nuevamente ',
				'Asignacion de parqueadero',
				'custom-danger-alert'
			);
		} finally {
			this.commonsService.dismissLoading();
		}
		try {
		} catch (error) {}
	}


}
