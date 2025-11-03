using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Assignment7.Models
{
    public class Vehicle
    {

        public int Id { get; set; }

        [Required]
        public string VehicleNumber { get; set; }

        [Required]
        public string Model { get; set; }

        [JsonIgnore]
        public ICollection<Trip> Trips { get; set; } = new List<Trip>();
    }
}
