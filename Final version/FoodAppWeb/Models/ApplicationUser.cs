using Microsoft.AspNetCore.Identity;

namespace FoodApp.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string firstName { get; set; }
        public string lastName { get; set; }
        public DateTime dateOfBirth { get; set; }
        public string location { get; set; }
    }
}
