using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Threading.Tasks;
using Urify.Server.Data;

namespace Urify.Server.Controllers
{
    public class UserController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;


        public UserController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager )
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("add-user")]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            var user = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                PasswordHash = model.Password,
                UserType = (UserType)model.UserType,
            };

            var result = await _userManager.CreateAsync(user, user.PasswordHash);

            if (result.Succeeded)
            {
                // Add UserType claim
                await _userManager.AddClaimAsync(user, new System.Security.Claims.Claim("UserType", user.UserType.ToString()));

                return Ok("Registration successful");
            }
            else
            {
                // Concatenate errors into a message string
                var message = string.Join(", ", result.Errors.Select(e => e.Description));
                return BadRequest(message);
            }
        }

        [HttpPost("login-user")]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model data.");
            }
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user == null)
            {
                return BadRequest("Invalid login attempt.");
            }

            var result = await _signInManager.PasswordSignInAsync(user.UserName, model.Password, isPersistent: false, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                return Ok("Login successful");
            }
            else
            {
                return BadRequest("Invalid login attempt.");
            }
        }

        //[HttpGet]
        //[Route("pingauth")]
        //[Authorize]
        //public async Task<IActionResult> PingAuth()
        //{
        //    var user = HttpContext.User;
        //    var email = user.FindFirstValue(ClaimTypes.Email);
        //    var applicationUser = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
        //    var userType = applicationUser.UserType;

        //    return (IActionResult)Results.Json(new { Email = email, UserType = userType }); ;
        //}
    }
}
