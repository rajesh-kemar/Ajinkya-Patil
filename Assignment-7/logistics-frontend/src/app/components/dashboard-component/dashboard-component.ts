import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-dashboard-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css',
})
export class DashboardComponent implements OnInit {
  totalTrip = 0;
  activeTrip = 0;
  completedTrip = 0;
  totalVehicle = 0;
  availableVehicle = 0;
  totalDriver = 0;
  availableDriver = 0;

  activeTripList: any[] = [];
  longTrip: any[] = [];
  tripService: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
      this.loadDashboardData();
      // this.loadLongTrips();

  }

  loadDashboardData() {
    //  Fetching Trips
    this.http.get<any[]>('http://localhost:5013/api/Trip').subscribe(trips => {
      this.totalTrip = trips.length;
      this.activeTrip = trips.filter(t => !t.isCompleted).length;
      this.completedTrip = trips.filter(t => t.isCompleted).length;

      // Long trips >8 hours
      this.http.get<any[]>('http://localhost:5013/api/Trip/longerthan8')
        .subscribe(res => this.longTrip = res);

      this.activeTripList = trips.filter(t => !t.isCompleted);
    });

    // Fetching Vehicle
    this.http.get<any[]>('http://localhost:5013/api/Vehicle/available').subscribe(avail => {
      this.availableVehicle = avail.length;
    });

    // Fetching Driver
    this.http.get<any[]>('http://localhost:5013/api/Driver').subscribe(drivers => {
      this.totalDriver = drivers.length;
    });    
  }

  // loadLongTrips() {
  //   this.tripService.getLongTrips().subscribe((data: any[]) => {
  //     this.longTrip = data;
  //   });
  // }
}

