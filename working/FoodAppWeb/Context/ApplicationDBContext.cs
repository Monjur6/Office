using FoodAppWeb.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodAppWeb.Context
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext>options) : base(options) 
        { 
            
        }
        public virtual DbSet<User>Users { get; set; }
    }
}
