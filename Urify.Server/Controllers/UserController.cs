using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Urify.Server.Data;

namespace Urify.Server.Controllers
{
    public class UserController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public UserController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
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
            string message = string.Empty;
            if (result.Succeeded)
            {
                return Ok("Registration made sucessfull");
            }
            else
            {
                return BadRequest(message);
            }
        }
    }
}
