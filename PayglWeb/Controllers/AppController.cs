using Microsoft.AspNetCore.Mvc;
using PayglService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayglWeb.Controllers
{
    public class AppController : Controller
    {
        public IActionResult Index()
        {
            var a = Service.getUser();
            ViewBag.Title = "Main";
            return View();
        }

        [HttpGet("contact")]
        public IActionResult Contact()
        {
            ViewBag.Title = "Contact";
            return View();
        }
    }
}
