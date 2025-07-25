using Microsoft.AspNetCore.Mvc;
using TouristAttractionAPI.Data;
using TouristAttractionAPI.Models;

namespace TouristAttractionAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttractionsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AttractionsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll() => Ok(_context.Attractions.ToList());

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var item = _context.Attractions.Find(id);
            return item == null ? NotFound() : Ok(item);
        }

        [HttpPost]
        public IActionResult Create(Attraction a)
        {
            _context.Attractions.Add(a);
            _context.SaveChanges();
            return CreatedAtAction(nameof(Get), new { id = a.Id }, a);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Attraction updated)
        {
            var attraction = _context.Attractions.Find(id);
            if (attraction == null) return NotFound();

            attraction.Name = updated.Name;
            attraction.Country = updated.Country;
            attraction.Description = updated.Description;
            attraction.Category = updated.Category;
            attraction.ImageUrl = updated.ImageUrl;

            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var attraction = _context.Attractions.Find(id);
            if (attraction == null) return NotFound();

            _context.Attractions.Remove(attraction);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
