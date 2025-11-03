import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../services/vehicle.service';
import { VehicleService } from '../../services/vehicle.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vehicle-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vehicle-component.html',
  styleUrl: './vehicle-component.css',
})
export class VehicleComponent implements OnInit {
  vehicles: Vehicle[] = [];
  available: Vehicle[] = [];
  newVehicle: Vehicle = { vehicleNumber: '', model: '' };

  constructor(private vehicleService: VehicleService) {}

  ngOnInit() {
    this.loadVehicle();
    this.loadAvailable();
  }

  loadVehicle(){
    this.vehicleService.getAll().subscribe(v => this.vehicles = v);
  }

  loadAvailable(){
    this.vehicleService.getAvailable().subscribe(a => this.available = a);
  }

  addVehicle(){
    this.vehicleService.create(this.newVehicle).subscribe(() => {
      this.newVehicle = { vehicleNumber: '', model: '' };
      this.loadVehicle();
    });
  }

}
