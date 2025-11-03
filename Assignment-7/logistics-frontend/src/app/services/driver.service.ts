
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Driver {
  id?: number;
  name: string;
  licenseNumber: string;
}

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  private apiUrl = 'http://localhost:5013/api/Driver';

  constructor(private http: HttpClient) {}

  getAllDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.apiUrl);

  }

  createDriver(driver: Driver) {
    return this.http.post<Driver>(this.apiUrl, driver);
  } 
}
