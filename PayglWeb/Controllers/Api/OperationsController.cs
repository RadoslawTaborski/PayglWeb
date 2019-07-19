using Microsoft.AspNetCore.Mvc;
using PayglService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayglWeb.Controllers.Api
{
    [Route("api/[Controller]")]
    public class OperationsController : Controller
    {
        private readonly IRepository _repository;
        public OperationsController(IRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult GetOperations()
        {
            try
            {
                return Ok(_repository.GetOperations());
            }
            catch (Exception)
            {
                return BadRequest("Failed");
            }
        }
    }
}
