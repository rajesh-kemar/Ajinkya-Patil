import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Vehicle {
  id?: number;
  vehicleNumber: string;
  model: string;

}

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private apiUrl = 'http://localhost:5013/api/Vehicle';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.apiUrl);

  }

  getAvailable(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.apiUrl}/available`);
  }

  create(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.apiUrl, vehicle);
  }

  }
  

