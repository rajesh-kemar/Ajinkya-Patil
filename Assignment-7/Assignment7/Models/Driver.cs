using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Assignment7.Models
{
    public class Driver
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string LicenseNumber { get; set; }

        [JsonIgnore]
        public ICollection<Trip> Trips { get; set; } = new List<Trip>();
    }
}
