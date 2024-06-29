using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Urify.Server.Data;

namespace Urify.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class WorkerController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public WorkerController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetWorkers()
        {
            // Consulta para buscar os IDs dos usuários com userType 1
            UserType userType = (UserType)1;
            var userIds = await _context.Users
            .Where(u => u.UserType == userType && u.IsAccountApproved)
                .Select(u => u.UserName) // Supondo que o ID do usuário seja armazenado na propriedade Id
                .ToListAsync();

            return Ok(userIds);
        }
        [HttpGet("worker-tickets")]
        public async Task<IActionResult> GetWorkerTickets([FromQuery] string userEmail)
        {
            var userId = await _context.Users
                .Where(u => u.Email == userEmail)
                .Select(u => u.Id)
                .FirstOrDefaultAsync();

            if (userId == null)
            {
                return NotFound("User not found");
            }

            var tickets = await _context.Tickets
                .Where(t => t.WorkerId == userId)
                .ToListAsync();

            return Ok(tickets);
        }


        [HttpPut("assign-worker")]
        public async Task<IActionResult> AssignWorkerToTicket(TicketWorkerDto ticketWorkerDto)
        {
            try
            {
                var ticket = await _context.Tickets.FindAsync(ticketWorkerDto.TicketId);
                if (ticket == null)
                {
                    return NotFound();
                }

                ticket.WorkerId = ticketWorkerDto.WorkerId;
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // Endpoint para alterar o trabalhador responsável por um ticket
        [HttpPut("update-worker")]
        public async Task<IActionResult> UpdateTicketWorker(TicketWorkerDto ticketWorkerDto)
        {
            try
            {
                var ticket = await _context.Tickets.FindAsync(ticketWorkerDto.TicketId);
                if (ticket == null)
                {
                    return NotFound();
                }

                ticket.WorkerId = ticketWorkerDto.WorkerId;
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }




    }
}
