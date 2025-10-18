import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '@environment';
import { firstValueFrom } from 'rxjs';
import { IAuthentication, IAuthResponse } from '../models/authentication.interface';
import { CommonsService } from './commons.service';
import { StorageService } from './storage.service';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	private differenceSecond: number;
	refreshed: boolean = true;

	constructor(
		private http: HttpClient,
		private jwtHelperService: JwtHelperService,
		private storageService: StorageService,
		private commonsService: CommonsService
	) {}
	public async signIn(authRequest: IAuthentication): Promise<IAuthResponse> {
		const authData: IAuthResponse = await firstValueFrom(
			this.http.post<IAuthResponse>(environment.back_url + 'authentication/sign-in', authRequest)
		);
		this.setAuthData(authData);
		return authData;
	}

	async setAuthData(authData: IAuthResponse): Promise<void> {
		const iat = this.jwtHelperService.decodeToken(authData.token).iat;
		await this.storageService.setItem('auth-data', JSON.stringify(authData));
		this.calcDifferenceTime(iat);
	}

	public async getCurrentAuthenticatedUser(): Promise<IAuthResponse> {
		return JSON.parse(await this.storageService.getItem('auth-data'));
	}

	async signOut(): Promise<void> {
		await this.storageService.removeAll();
		await this.commonsService.navigate('sign-in');
	}

	async calculateTimeExpiration(): Promise<number> {
		const exp = this.jwtHelperService.decodeToken((await this.getCurrentAuthenticatedUser()).token).exp * 1000;
		return exp + this.getDifferenceSecond() - new Date().getTime();
	}

	public tokenExpired(token: string): boolean {
		const expiry = this.jwtHelperService.decodeToken(token).exp * 1000 + this.getDifferenceSecond();
		return new Date().getTime() >= expiry;
	}

	private calcDifferenceTime(iat: number): void {
		const iatDate = iat * 1000;
		const actualDate = new Date().getTime();
		const difference = actualDate - iatDate;
		this.differenceSecond = difference;
		localStorage.setItem('differenceTime', this.differenceSecond.toString());
	}

	private getDifferenceSecond(): number {
		if (this.differenceSecond) {
			return this.differenceSecond;
		} else {
			this.differenceSecond = Number(localStorage.getItem('differenceTime'));
		}
		return this.differenceSecond;
	}

	public async refreshToken(): Promise<void> {
		if (this.refreshed) {
			this.refreshed = false;
			const userData = await this.getCurrentAuthenticatedUser();
			this.http
				.post<any>(environment.back_url + 'authentication/refresh-token', {
					refreshToken: userData.refreshToken
				})
				.subscribe({
					next: (data) => {
						this.refreshed = true;
						this.setAuthData(data);
					},
					error: async () => {
						await this.storageService.removeAll();
						this.commonsService.navigate('home');
						this.refreshed = true;
					}
				});
		}
	}
}
