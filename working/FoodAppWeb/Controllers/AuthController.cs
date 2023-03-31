using FoodAppWeb.Context;
using FoodAppWeb.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FoodAppWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public IConfiguration _configuration;
        public readonly ApplicationDBContext _dbContext;
        // Constructor for the controller that sets the configuration and database context fields
        public AuthController(IConfiguration configuration, ApplicationDBContext dbContext)
        {
            _dbContext = dbContext;
            _configuration = configuration;
        }
        // Define a GET endpoint for getting a user by their username and password
        [HttpGet]
        public async Task<User> GetUser(string userName, string password)
        {
            return await _dbContext.Users.FirstOrDefaultAsync(u => u.UserName == userName && u.Password == password);
        }
        // Define a POST endpoint for authenticating a user and returning a JWT token
        [HttpPost]
        public async Task<IActionResult> Post(User user)
        {
            if (user != null && user.UserName != null && user.Password != null)
            {
                // Get the user data from the database context using the GET endpoint defined earlier
                var userData = await GetUser(user.UserName, user.Password);
                // Get the JWT configuration from the appsettings.json file
                var jwt = _configuration.GetSection("Jwt").Get<Jwt>();
                // If the user data is not null, create claims for the JWT token
                if (userData != null)
                {
                    var claims = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Sub, jwt.Subject),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                    new Claim("UserName", user.UserName.ToString()),
                    new Claim("Password", user.Password)
                    };
                    // Create a symmetric security key from the JWT secret key
                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.key));
                    // Create a signing credential from the security key and hash algorithm
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    // Create a JWT token with the specified issuer, audience, claims, expiration, and signing credentials
                    var token = new JwtSecurityToken(
                        jwt.Issuer,
                        jwt.Audience,
                        claims,
                        expires: DateTime.Now.AddMinutes(20),
                        signingCredentials: signIn
                        );
                    // Return the JWT token as a string
                    return Ok(new JwtSecurityTokenHandler().WriteToken(token).ToString());
                }
                else
                {
                    // Return a bad request response if the user data is null
                    return BadRequest("Invalid Credentials");
                }
            }
            else
            {
                // Return a bad request response if the user object or its username and password properties are null
                return BadRequest("Invalid Credentials");
            }
        }
    }
}
