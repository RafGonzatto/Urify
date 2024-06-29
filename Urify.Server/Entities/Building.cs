using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Urify.Server.Data;

namespace Urify.Server.Data
{
    public class Building
    {
        [Key]
        public int BuildingId { get; set; }
        public string Name { get; set; }
        public ICollection<Ticket> Tickets { get; set; }
    }
}
