import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@shared/services/authentication.service';
import { CommonsService } from '@shared/services/commons.service';
import { IAuthResponse } from '../shared/models/authentication.interface';
import { SignInValidationMessages } from './models/sign-in';
@Component({
	selector: 'kot-sign-in',
	templateUrl: './sign-in.page.html',
	styleUrls: ['./sign-in.page.scss']
})
export class SignInPage {
	public readonly signInValidationMessages = signal<SignInValidationMessages>({
		email: [
			{ type: 'required', message: 'Este campo es requerido' },
			{ type: 'pattern', message: 'No es un correo válido, debe tener @ y dominio' }
		],
		password: [
			{ type: 'required', message: 'Este campo es requerido' },
			{ type: 'pattern', message: 'La contraseña no es válida' }
		]
	});

	public signInForm = new FormGroup({
		email: new FormControl('alejo.mateus.ud@gmail.com', {
			nonNullable: true,
			validators: [
				Validators.required,
				Validators.pattern('^([a-zA-Z0-9-+_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$')
			]
		}),
		password: new FormControl('Alejo*3114409283', {
			nonNullable: true,
			validators: [
				Validators.required,
				Validators.pattern(
					'^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+={};:\'\\"|,.<>?/~`])[\\w!@#$%^&*()_+={};:\'\\"|,.<>?/~`]{8,50}$'
				)
			]
		})
	});

	constructor(
		private commonsService: CommonsService,
		private authenticationService: AuthenticationService
	) {}

	public async signUpNavigation(): Promise<void> {
		await this.commonsService.navigate('sign-up');
	}

	shouldShowError(formControlName: string): boolean {
		return (
			this.signInForm.controls[formControlName].invalid &&
			(this.signInForm.controls[formControlName].dirty || this.signInForm.controls[formControlName].touched)
		);
	}

	public async signIn(): Promise<void> {
		if (this.signInForm.invalid) {
			this.signInForm.markAllAsTouched();
			return;
		}

		this.commonsService.showLoading('Validando tus credenciales');
		try {
			const authData: IAuthResponse = await this.authenticationService.signIn(this.signInForm.getRawValue());
			this.commonsService.dismissLoading();
			const destination = authData.user.role !== 'admin' ? 'user' : 'admin';
			this.commonsService.navigate(destination);
		} catch (error) {
			this.commonsService.showAlert(
				'Usuario y/o contraseña incorrectos, Ingresa nuevamente tus datos ',
				'Credenciales incorrectas',
				'custom-danger-alert'
			);
		} finally {
			this.commonsService.dismissLoading();
		}
	}
}
