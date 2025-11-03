
import { Component, OnInit } from '@angular/core';
import { Driver, DriverService } from '../../services/driver.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-driver-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './driver-component.html',
  styleUrl: './driver-component.css',
})
export class DriverComponent implements OnInit {
createDriver() {
throw new Error('Method not implemented.');
}
  driver: Driver[] = [];
  newDriver: Driver = { name: '', licenseNumber: '' };

  constructor(private driverService: DriverService) {}

  ngOnInit() {
    this.loadDriver();
  }

    loadDriver() {
    this.driverService.getAllDrivers().subscribe((data: Driver[]) => this.driver = data);
  }

  addDriver() {
    this.driverService.createDriver(this.newDriver).subscribe(() => {
      this.newDriver = { name: '', licenseNumber: '' };
      this.loadDriver();
    });
  }

  }


