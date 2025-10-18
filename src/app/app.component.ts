import { Location } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IAuthResponse } from '@shared/models/authentication.interface';
import { AuthenticationService } from '@shared/services/authentication.service';
import { CommonsService } from '@shared/services/commons.service';
import { StorageService } from '@shared/services/storage.service';

@Component({
	selector: 'kot-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
	authData: IAuthResponse;
	currentUrl: string;

	constructor(
		private commonsService: CommonsService,
		private storageService: StorageService,
		private authenticationService: AuthenticationService,
		private router: Router,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
		this.route.fragment.subscribe((fragment: string) => {
			if (fragment) {
				setTimeout((): void => {
					const element = document.getElementById(fragment);
					if (document.getElementById(fragment)) {
						element.scrollIntoView({ behavior: 'smooth' });
					}
				}, 250);
			}
		});

		this.registerRouteChanges();
	}
	registerRouteChanges(): void {
		this.router.events.subscribe(async (event: any): Promise<void> => {
			if (event instanceof NavigationEnd) {
				this.obtenerPrimerSegmento();
				this.authData = JSON.parse(await this.storageService.getItem('auth-data'));
			}
		});
	}

	obtenerPrimerSegmento(): void {
		this.currentUrl = this.location.path().split('/')[1];
	}

	navigate(route: string, fragment?: string): void {
		this.commonsService.navigate(route, null, fragment);
	}

	async signOut(): Promise<void> {
		await this.authenticationService.signOut();
	}

	@HostListener('window:keydown')
	@HostListener('click', ['$event.target'])
	async checkRefreshToken(): Promise<void> {
		const user = await this.authenticationService.getCurrentAuthenticatedUser();
		if (user) {
			const time = await this.authenticationService.calculateTimeExpiration();
			if (time < 500000 && time > 100) {
				await this.authenticationService.refreshToken();
			}
			if (time <= 100) {
				await this.authenticationService.signOut();
			}
		}
	}
}
