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
            ViewBag.Title = "Index";
            return View();
        }

        [HttpGet("operation")]
        public IActionResult Operation()
        {
            ViewBag.Title = "Operation";
            return View();
        }

        [HttpGet("group")]
        public IActionResult Group()
        {
            ViewBag.Title = "Group";
            return View();
        }

        [HttpGet("search")]
        public IActionResult Search()
        {
            ViewBag.Title = "Search";
            return View();
        }
    }
}
