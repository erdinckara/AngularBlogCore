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
    public class HelperController : ControllerBase {

        [HttpPost]
        public IActionResult SendContactEmail (Contact contact) {

            MailMessage mailMessage = new MailMessage ();

            SmtpClient smtpClient = new SmtpClient ("smtp.gmail.com",587);

            mailMessage.From = new MailAddress ("erdinc.kara.tr@gmail.com");
            mailMessage.To.Add ("erdinckara10@gmail.com");

            mailMessage.Subject = contact.Subject;
            mailMessage.Body = contact.Message;
            mailMessage.IsBodyHtml = true;
            smtpClient.Port = 587;
            smtpClient.EnableSsl = true;

            smtpClient.Credentials = new System.Net.NetworkCredential ("erdinc.kara.tr@gmail.com", "");

            smtpClient.Send (mailMessage);

            return Ok ();
        }
    }
}