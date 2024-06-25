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

        [HttpGet("all-buldings")]
        public async Task<ActionResult<IEnumerable<Building>>> GetBuildings()
        {
            return await _context.Buildings.ToListAsync();
        }
    }
}
