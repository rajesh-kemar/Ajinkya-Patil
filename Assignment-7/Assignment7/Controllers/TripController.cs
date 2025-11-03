using Assignment7.Data;
using Assignment7.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Assignment7.Controllers
{
    [ApiController]
    [Route ("api/[controller]")]
    public class TripController : ControllerBase
    {
        private readonly Assign7DbContext _context;
        public TripController(Assign7DbContext context) => 
            
            _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Trip>>> GetAllTrips()
        {
            var trips = await _context.Trips.Include(t => t.Driver).Include(t => t.Vehicle).ToListAsync();
            return Ok(trips);

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Trip>> GetTripById(int id)
        {
            var trip = await _context.Trips.Include(t => t.Driver).Include(t => t.Vehicle)
                .FirstOrDefaultAsync(t => t.Id == id);
            if (trip == null) return NotFound();
            return Ok(trip);
        }

        [HttpPost]
        public async Task<ActionResult<Trip>> CreateTrip(Trip trip)
        {
            if (!await _context.Drivers.AnyAsync(d => d.Id == trip.DriverId))
                return BadRequest($"Driver with ID {trip.DriverId} not found.");

            if (!await _context.Vehicles.AnyAsync(v => v.Id == trip.VehicleId))
                return BadRequest($"Vehicle with ID {trip.VehicleId} not found.");


            _context.Trips.Add(trip);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTripById), new { id = trip.Id }, trip);
        }

        [HttpPut("{id}/Complete")]
        public async Task<IActionResult> CompleteTrip(int id)
        {
            var trip = await _context.Trips.FindAsync(id);
            if (trip == null) return NotFound($"Trip with Id {id} not found.");

            trip.IsCompleted = true;
            await _context.SaveChangesAsync();
            return Ok(new { Message = "Trip marked as completed", trip });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTrip(int id)
        {
            var trip = await _context.Trips.FindAsync(id);
            if (trip == null) return NotFound();

            _context.Trips.Remove(trip);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("longerthan8")]
        public async Task<ActionResult<IEnumerable<Trip>>> GetTripsLongerThan8Hours()
        {
            var longTri = await _context.Trips
                .Include(t => t.Driver)
                .Include(t => t.Vehicle)
                .Where(t => t.StartTime != null && t.EndTime != null &&
                            EF.Functions.DateDiffHour(t.StartTime, t.EndTime) > 8)
                .ToListAsync();

            return Ok(longTri);
        }




        [HttpGet("/api/drivers/{driverId}/trips")]
        public async Task<ActionResult<IEnumerable<Trip>>> GetTripsByDriver(int driverId)
        {
            var trips = await _context.Trips
                .Where(t => t.DriverId == driverId)
                .Include(t => t.Vehicle)
                .ToListAsync();

            if (!trips.Any())
                return NotFound($"No trips found for driver with ID {driverId}");

            return Ok(trips);
        }

    }
}
