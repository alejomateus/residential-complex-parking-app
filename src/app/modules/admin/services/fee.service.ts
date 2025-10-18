import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { Fee } from '../models/fee';

@Injectable({
	providedIn: 'root'
})
export class FeeService {
	constructor(private http: HttpClient) {}

	updateFee(parkingSlotId: string): Observable<any> {
		return this.http.put(`${environment.back_url}fee/${parkingSlotId}`, {});
	}

	createFee(data: Partial<Fee>): Observable<any> {
		return this.http.post(`${environment.back_url}fee`, data);
	}
}
