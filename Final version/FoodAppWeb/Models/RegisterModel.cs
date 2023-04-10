using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class RegisterModel
    {
        public string? firstName { get; set; }
        public string? lastName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? location { get; set; }
        public string? Username { get; set; }

        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string? Password { get; set; }
        public void SetDefaultUsername()
        {
            if (string.IsNullOrEmpty(Username) && !string.IsNullOrEmpty(Email))
            {
                Username = Email.Split('@')[0];
            }
        }
    }
}
