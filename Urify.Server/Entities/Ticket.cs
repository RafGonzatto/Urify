using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Urify.Server.Data
{
    public enum TicketStatus
    {
        Open,
        InProcess,
        Solved
    }

    public class Ticket
    {

        [Key]
        public int TicketId { get; set; }

        public string UserId { get; set; }
        public ApplicationUser User { get; set; }

        public int BuildingId { get; set; }
        public Building TheBuilding { get; set; }

        public DateTime DateCreated { get; set; }

        [StringLength(200)]
        public string Description { get; set; }

        public byte[]? Image { get; set; }

        public string? WorkerId { get; set; }
        public ApplicationUser Worker { get; set; }

        public TicketStatus Status { get; set; }
    }
}
