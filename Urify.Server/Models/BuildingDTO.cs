
namespace Urify.Server.Data
{
    public class BuildingDto
    {
        public int BuildingId { get; set; }
        public string Name { get; set; }
        public int TicketCount { get; set; }
        public List<TicketDto> Tickets { get; set; }
    }

}