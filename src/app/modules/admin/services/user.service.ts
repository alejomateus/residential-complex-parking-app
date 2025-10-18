import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	constructor(private http: HttpClient) {}

	getUserById(userId: string): Observable<any> {
		return this.http.get(`${environment.back_url}users/${userId}`);
	}
}
