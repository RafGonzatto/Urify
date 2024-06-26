﻿using Microsoft.AspNetCore.Identity;
using Urify.Server.Data;

namespace Urify.Server.Data
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public UserType UserType { get; set; }
        public bool IsAccountApproved { get; set; }
    }
}
