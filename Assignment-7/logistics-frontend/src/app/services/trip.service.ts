import { Vehicle } from './vehicle.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Driver } from './driver.service';


export interface Trip {
  id?: number;
  tripName: string;
  source: string;
  destination: string;
  isCompleted: boolean;
  startTime: string;
  endTime: string;
  vehicleId: number;
  vehicle?: Vehicle;
  driverId: number;
  driver?: Driver;
}

@Injectable({
  providedIn: 'root',
})
export class TripService {
  private apiUrl = 'http://localhost:5013/api/Trip';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.apiUrl);
  }

  create(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.apiUrl, trip);

  }

  getLongTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.apiUrl}/trips/longerthan8`)
  }
  
  markCompleted(id: number): Observable<any> {
    //  This should call your backend endpoint like PUT /api/trips/{id}/complete
    return this.http.put(`${this.apiUrl}/${id}/complete`, {});
}
}
