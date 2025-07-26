using Microsoft.EntityFrameworkCore;
using TouristAttractionAPI.Models;

namespace TouristAttractionAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<Attraction> Attractions { get; set; }
    }
}
