import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DashboardOptions } from '@models/dashboard-options';

@Component({
	selector: 'kot-dashboard-options',
	templateUrl: './dashboard-options.component.html',
	styleUrls: ['./dashboard-options.component.scss']
})
export class DashboardOptionsComponent implements OnInit {
	@Input() dashboardOptions: DashboardOptions[] = [];
	@Output() containerClick = new EventEmitter<string>();
	@Input() title: string = 'Binaries';

	sanitizedUrls: { [key: string]: SafeResourceUrl } = {};

	constructor(private sanitizer: DomSanitizer) {}

	ngOnInit() {
		this.dashboardOptions.forEach((option) => {
			if (option.url) {
				this.sanitizedUrls[option.url] = this.sanitizer.bypassSecurityTrustResourceUrl(option.url);
			}
		});
	}

	clickContainer(option: DashboardOptions): void {
		if (!option.url) {
			this.containerClick.emit(option.redirect);
		}
	}

	getSanitizedUrl(url: string): SafeResourceUrl {
		return this.sanitizedUrls[url];
	}
}
