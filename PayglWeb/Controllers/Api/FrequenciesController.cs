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
    public class FrequenciesController : Controller
    {
        private readonly IRepository _repository;
        public FrequenciesController(IRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_repository.GetFrequencies());
            }
            catch (Exception)
            {
                return BadRequest("Failed");
            }
        }
    }
}
