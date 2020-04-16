using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using AngularBlogCore.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace AngularBlogCore.API.Controllers {

    [Route ("api/[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase {

        [HttpPost]
        public IActionResult IsAuthenticated (AdminUser adminUser) {
            bool status = false;

            if (adminUser.Email == "erdinckara10@gmail.com" && adminUser.Password == "123")
                status = true;

            var result = new {
                status = status
            };

            return Ok (result);
        }

    }
}