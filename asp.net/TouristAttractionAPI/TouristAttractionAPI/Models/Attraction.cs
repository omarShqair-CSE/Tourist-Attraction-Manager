namespace TouristAttractionAPI.Models
{
    public class Attraction
    {
                public int Id { get; set; } // Primary Key
        public string Name { get; set; }
        public string Country { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string ImageUrl { get; set; } // Optional
    }
}
