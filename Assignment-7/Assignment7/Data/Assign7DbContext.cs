using Assignment7.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Diagnostics.Contracts;

namespace Assignment7.Data
{
    public class Assign7DbContext : DbContext
    {
      
        public Assign7DbContext(DbContextOptions<Assign7DbContext> options) : base(options) { }

        public DbSet<Trip> Trips { get; set; }

        public DbSet<Driver> Drivers { get; set; }

        public DbSet<Vehicle> Vehicles { get; set; }
        public object Trip { get; internal set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // DRIVER → TRIPS (One-to-Many)
            modelBuilder.Entity<Driver>()
                .HasMany(d => d.Trips)
                .WithOne(t => t.Driver)
                .HasForeignKey(t => t.DriverId)
                .OnDelete(DeleteBehavior.Restrict);

            // VEHICLE → TRIPS (One-to-Many)
            modelBuilder.Entity<Vehicle>()
                .HasMany(v => v.Trips)
                .WithOne(t => t.Vehicle)
                .HasForeignKey(t => t.VehicleId)
                .OnDelete(DeleteBehavior.Restrict);

            base.OnModelCreating(modelBuilder);
        }


    }
}
