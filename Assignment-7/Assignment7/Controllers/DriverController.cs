using Assignment7.Data;
using Assignment7.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Assignment7.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DriverController : ControllerBase
    {

        private readonly Assign7DbContext _context;
        public DriverController(Assign7DbContext context) => _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Driver>>> GetAllDrivers() =>
            Ok(await _context.Drivers.ToListAsync());


        [HttpGet("{id}")]
        public async Task<ActionResult<Driver>> GetDriver(int id)
        {
            var driver = await _context.Drivers
                .Include(d => d.Trips)
                .ThenInclude(t => t.Vehicle)
                .FirstOrDefaultAsync(d => d.Id == id);

            if (driver == null) return NotFound();
            return Ok(driver);
        }

        [HttpPost]
        public async Task<ActionResult<Driver>> CreateDriver(Driver driver)
        {
            _context.Drivers.Add(driver);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetDriver), new { id = driver.Id }, driver);

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDriver(int id, Driver driver)
        {
            if (id != driver.Id) return BadRequest();

            _context.Entry(driver).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDriver(int id)
        {
            var driver = await _context.Drivers.FindAsync(id);
            if (driver == null) return NotFound();

            _context.Drivers.Remove(driver);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
