using DataBaseWithBusinessLogicConnector.ApiEntities;
using DataBaseWithBusinessLogicConnector.DalEntities;
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
    public class ImportancesController : Controller
    {
        private readonly IRepository _repository;
        public ImportancesController(IRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_repository.GetImportances());
            }
            catch (Exception)
            {
                return BadRequest("Failed");
            }
        }

        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            try
            {
                return Ok(_repository.GetImportance(id));
            }
            catch (Exception)
            {
                return BadRequest("Failed");
            }
        }
    }
}
