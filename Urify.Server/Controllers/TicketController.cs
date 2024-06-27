using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Urify.Server.Data;

namespace Urify.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public TicketController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet("all-tickets")]
        public async Task<ActionResult<IEnumerable<Ticket>>> GetTickets()
        {
            return await _context.Tickets.ToListAsync();
        }

        [HttpPost("create-ticket")]
        public async Task<ActionResult<Ticket>> PostTicket([FromForm] TicketFormData formData)
        {
            var user = await _userManager.FindByEmailAsync(formData.Email);
            if (user == null)
            {
                return Unauthorized();
            }
            byte[] imageBytes = null;

            if (formData.Image != null)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await formData.Image.CopyToAsync(memoryStream);
                    imageBytes = memoryStream.ToArray();
                }
            }

            // Crie um novo ticket usando os dados do formData
            var ticket = new Ticket
            {
                UserId = user.Id,
                DateCreated = DateTime.UtcNow,
                Status = TicketStatus.Open,
                BuildingId = formData.BuildingId,
                Description = formData.Description,
                Image = imageBytes
                // Salvar ou processar a imagem aqui, se necessário
            };

            // Salve o ticket no banco de dados
            _context.Tickets.Add(ticket);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTicket", new { id = ticket.TicketId }, ticket);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TicketDto>> GetTicketById(int id)
        {
            var ticket = await _context.Tickets
                .Include(t => t.User)
                .Include(t => t.Worker)
                .Include(t => t.TheBuilding)
                .FirstOrDefaultAsync(t => t.TicketId == id);

            if (ticket == null)
            {
                return NotFound();
            }

            var ticketDto = new TicketDto
            {
                TicketId = ticket.TicketId,
                Description = ticket.Description,
                Status = (int)ticket.Status,
                Image = ticket.Image != null ? Convert.ToBase64String(ticket.Image) : null,
                UserId = ticket.UserId,
                UserName = ticket.User?.UserName,
                WorkerId = ticket.WorkerId,
                WorkerName = ticket.Worker?.UserName,
                BuildingId = ticket.BuildingId,
                BuildingName = ticket.TheBuilding?.Name,
                DateCreated = ticket.DateCreated
            };


            return Ok(ticketDto);
        }

        [HttpPut("alter-ticket/{id}")]
        public async Task<IActionResult> PutTicket(int id, Ticket ticket)
        {
            if (id != ticket.TicketId)
            {
                return BadRequest();
            }

            _context.Entry(ticket).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TicketExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("delete-ticket/{id}")]
        public async Task<IActionResult> DeleteTicket(int id)
        {
            var ticket = await _context.Tickets.FindAsync(id);
            if (ticket == null)
            {
                return NotFound();
            }

            _context.Tickets.Remove(ticket);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TicketExists(int id)
        {
            return _context.Tickets.Any(e => e.TicketId == id);
        }
    }
}
