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
    public class UserApprovalController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserApprovalController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: /user/approve
        [HttpGet("approve")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsersToApprove()
        {
            var usersToApprove = await _context.Users
                .Where(u => !u.IsAccountApproved)
                .Select(u => new UserDto
                {
                    Id = u.Id,
                    UserName = u.UserName
                })
                .ToListAsync();

            return Ok(usersToApprove);
        }

        // PUT: /user/approve/{id}
        [HttpPut("approve/{id}")]
        public async Task<IActionResult> ApproveUser(string id, ApproveUserDto approveUserDto)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            user.IsAccountApproved = approveUserDto.Approved;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return NoContent();
        }
    }
}
