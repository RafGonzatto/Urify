﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
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
            byte[]? imageBytes = null;

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

            return Ok();
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
        public async Task<IActionResult> UpdateTicketWorker([FromBody] TicketWorkerDto ticketPayload)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(t => t.UserName == ticketPayload.WorkerId);
                var ticket = await _context.Tickets.FindAsync(ticketPayload.TicketId); // Use o ID do parâmetro de rota
                if (ticket == null)
                {
                    return NotFound();
                }
                TicketStatus ticketOnProcess = (TicketStatus)1;
                // Atualiza o workerId do ticket com o novo valor recebido
                ticket.WorkerId = user.Id;
                ticket.Status = ticketOnProcess;

                _context.Tickets.Update(ticket);
                await _context.SaveChangesAsync();

                return Ok(ticket);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao atualizar o ticket: {ex.Message}");
            }
        }

        [HttpPut("resolve-ticket/{id}")]
        public async Task<IActionResult> UpdateTicketWorker(int id, [FromBody] TicketWorkerDto ticketPayload)
        {
            try
            {
             
                var ticket = await _context.Tickets.FindAsync(id); // Buscar o ticket pelo ID recebido

                if (ticket == null)
                {
                    return NotFound();
                }

                ticket.Status = (TicketStatus)2; // Definir o status como Resolvido (ou o valor correto conforme a enumeração)

                _context.Tickets.Update(ticket); // Atualizar o ticket no contexto
                await _context.SaveChangesAsync(); // Salvar as alterações no banco de dados

                return Ok(ticket); // Retornar o ticket atualizado
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao atualizar o ticket: {ex.Message}");
            }
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
