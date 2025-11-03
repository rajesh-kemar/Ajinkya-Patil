using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Assignment7.Models
{
    public class Trip
    {

        public int Id { get; set; }

        [Required]
        public string TripName { get; set; }

        [Required]
        public string Source { get; set; }

        [Required]
        public string Destination { get; set; }

        public bool IsCompleted { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }

        [ForeignKey("Vehicle")]
        public int VehicleId { get; set; }
        public Vehicle? Vehicle { get; set; }

        [ForeignKey("Driver")]
        public int DriverId { get; set; }
        public Driver? Driver { get; set; }


    }
}


