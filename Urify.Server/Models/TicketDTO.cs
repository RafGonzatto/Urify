
namespace Urify.Server.Data
{

    public class TicketDto
    {
        public int TicketId { get; set; }
        public string Description { get; set; }
        public string Image { get; set; } // This should be a base64 string or URL
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string? WorkerId { get; set; }
        public string? WorkerName { get; set; }
        public int BuildingId { get; set; }
        public string BuildingName { get; set; }
        public DateTime DateCreated { get; set; }
        public int Status { get; set; }
        // Outras propriedades do ticket que você deseja incluir
    }
    public class TicketWorkerDto
    {
        public int TicketId { get; set; }
        public string WorkerId { get; set; }
    }

}