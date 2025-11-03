import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard-component/dashboard-component';
import { DriverComponent } from './components/driver-component/driver-component';
import { VehicleComponent } from './components/vehicle-component/vehicle-component';
import { TripComponent } from './components/trip-component/trip-component';

export const routes: Routes = [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {path: 'dashboard', component: DashboardComponent},
    { path: 'driver', component: DriverComponent },
    { path: 'vehicle', component: VehicleComponent },
    { path: 'trip', component: TripComponent }
];

