using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Urify.Server.Data;

namespace Urify.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BuildingController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BuildingController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("all-buildings")]
      public async Task<ActionResult<IEnumerable<BuildingDto>>> GetBuildings()
        {
            var buildings = await _context.Buildings
           .Include(b => b.Tickets) // Inclui os tickets associados a cada construção
           .ToListAsync();

            // Mapeia para BuildingDto se necessário
            var buildingDtos = buildings.Select(b => new BuildingDto
            {
                BuildingId = b.BuildingId,
                Name = b.Name,
                TicketCount = b.Tickets.Count, // Calcula a quantidade de tickets
                Tickets = b.Tickets.Select(t => new TicketDto
                {
                    TicketId = t.TicketId,
                    // Outras propriedades do ticket que você deseja incluir
                }).ToList()
            }).ToList();

            return buildingDtos;
        }

    }
}
