import { Component, Input, OnInit } from '@angular/core';
import { Schedule } from '@models/schedule';

@Component({
	selector: 'kot-schedule',
	templateUrl: './schedule.component.html',
	styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
	@Input() schedule: Schedule;
	max: string[];
	keys: string[];
	isEdit: boolean = true;
	constructor() {}

	ngOnInit() {
		let max = 0;
		this.keys = Object.keys(this.schedule);
		this.keys.forEach((item: string) => {
			if (max <= this.schedule[item]?.hours.length) {
				max = this.schedule[item]?.hours.length;
				this.max = new Array(max);
			}
		});
	}
}
