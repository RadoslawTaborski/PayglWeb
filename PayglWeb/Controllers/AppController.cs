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

        [HttpGet("import")]
        public IActionResult Import()
        {
            ViewBag.Title = "Import";
            return View();
        }

        [HttpGet("search")]
        public IActionResult Search()
        {
            ViewBag.Title = "Search";
            return View();
        }

        [HttpGet("filters")]
        public IActionResult Filters()
        {
            ViewBag.Title = "Filters";
            return View();
        }

        [HttpGet("dashboards")]
        public IActionResult Dashboards()
        {
            ViewBag.Title = "Dashboards";
            return View();
        }

        [HttpGet("analysis")]
        public IActionResult Analysis()
        {
            ViewBag.Title = "Analysis";
            return View();
        }

        [HttpGet("importsettings")]
        public IActionResult ImportSettings()
        {
            ViewBag.Title = "ImportSettings";
            return View();
        }
    }
}
