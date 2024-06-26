
namespace Urify.Server.Data
{
    public class TicketFormData
    {
        public int BuildingId { get; set; }
        public string Description { get; set; }
        public IFormFile? Image { get; set; }
        public string Email { get; set; }
    }
}