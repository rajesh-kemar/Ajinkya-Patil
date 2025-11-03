import { Trip, TripService } from './../../services/trip.service';
import { Component, OnInit } from '@angular/core';
import { DriverService } from '../../services/driver.service';
import { VehicleService } from '../../services/vehicle.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-trip-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trip-component.html',
  styleUrl: './trip-component.css',
})
export class TripComponent implements OnInit {
  trips: Trip[] = [];
  vehicle: any[] = [];
  driver: any[] = [];
  message = '';
    newTrip: any = { 
      tripName:'', 
      source:'', 
      destination:'', 
      isCompleted:false, 
      startTime:'', 
      endTime:'', 
      vehicleId:0, 
      driverId:0 
    };

    constructor(private tripService: TripService, private vehicleService: VehicleService, private driverService: DriverService) {}

    ngOnInit(): void {  this.loadTrip(); this.loadVehicle(), this.loadDriver(); }

    loadTrip() { this.tripService.getAll().subscribe(d => this.trips = d); }
    loadVehicle() { this.vehicleService.getAvailable().subscribe(d => this.vehicle = d, e => console.error(e)); }
    loadDriver() { this.driverService.getAllDrivers().subscribe(d => this.driver = d, e => console.error(e));}
    
    createTrip(){
    if(!this.newTrip.tripName || this.newTrip.vehicleId === 0 || this.newTrip.driverId === 0){ this.message='Fill required fields'; return;}
    const payload = {
      ...this.newTrip,
      startTime: new Date(this.newTrip.startTime).toISOString(),
      endTime: new Date(this.newTrip.endTime).toISOString()
    };
    this.tripService.create(payload).subscribe(() => { this.message='Created'; this.newTrip = {tripName:'',source:'',destination:'',isCompleted:false,startTime:'',endTime:'',vehicleId:0,driverId:0}; this.loadTrip(); this.loadVehicle(); }, err => { console.error(err); this.message='Error'; });
  }

    markCompleted(id:number){ this.tripService.markCompleted(id).subscribe(()=> { this.loadTrip(); this.loadVehicle(); }); }
}  





  





