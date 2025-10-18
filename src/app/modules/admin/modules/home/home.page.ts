import { Component, OnInit, signal } from '@angular/core';
import { DashboardOptions } from '@models/dashboard-options';
import { CommonsService } from '@shared/services/commons.service';

@Component({
	selector: 'kot-home',
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
	options = signal<DashboardOptions[]>([
		{
			title: 'Administrar espacio de parqueadero',
			description: 'Agrega o libera espacios',
			color: 'danger',
			redirect: 'visitor-parking-spots'
		},
		{
			title: 'Verificar residente',
			description: 'Escanea el codigo qr del residente para validar su ingreso',
			color: 'light',
			redirect: 'check-residential-user'
		},
		{
			title: 'Sorteo',
			description: 'Sorteo de parqueaderos comunales',
			color: 'primary',
			redirect: 'lottery'
		}
	]);
	constructor(private commonsService: CommonsService) {}

	ngOnInit() {}

	async navigate(route: string): Promise<void> {
		await this.commonsService.navigate('admin/' + route);
	}
}
