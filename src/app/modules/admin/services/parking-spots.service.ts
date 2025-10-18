import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ParkingSpotsService {
	constructor(private http: HttpClient) {}

	getVisitorParkingSpots(): Observable<any> {
		return this.http.get(`${environment.back_url}parking-spots/visitor-parking-spots`);
	}

	getParkingSpotsByUserId(userId: string): Observable<any> {
		return this.http.get(`${environment.back_url}parking-spots/user/${userId}`);
	}
	lottery(executionDate: string): Observable<any> {
		return this.http.post(`${environment.back_url}parking-spot-lottery`, { executionDate });
	}
	getLottery(): Observable<any> {
		return this.http.get(`${environment.back_url}parking-spot-lottery`);
	}
}
