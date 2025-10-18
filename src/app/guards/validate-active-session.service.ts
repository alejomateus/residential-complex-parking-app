import { Injectable } from '@angular/core';
import { IAuthResponse } from '@shared/models/authentication.interface';
import { AuthenticationService } from '@shared/services/authentication.service';
import { CommonsService } from '@shared/services/commons.service';

@Injectable()
export class ValidateActiveSessionService {
	constructor(
		private authenticationService: AuthenticationService,
		private commonsService: CommonsService
	) {}

	async canActivate(checkAdmin: boolean = false): Promise<boolean> {
		let value: boolean = false;

		const userData: IAuthResponse = await this.authenticationService.getCurrentAuthenticatedUser();
		let token: string = '';
		if (userData) {
			token = userData.token;
		}
		if (checkAdmin && userData.user.role !== 'admin') {
			await this.commonsService.navigate('user');
		}

		if (!token || token === '' || this.authenticationService.tokenExpired(token)) {
			await this.authenticationService.signOut();
		} else {
			value = true;
		}
		return value;
	}
}
