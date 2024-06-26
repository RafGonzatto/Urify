
namespace Urify.Server.Data
{
    public class BuildingDto
    {
        public int BuildingId { get; set; }
        public string Name { get; set; }
        public int TicketCount { get; set; }
        public List<TicketDto> Tickets { get; set; }
    }

    public class TicketDto
    {
        public int TicketId { get; set; }
        public string Description { get; set; }
        // Outras propriedades do ticket que você deseja incluir
    }
}