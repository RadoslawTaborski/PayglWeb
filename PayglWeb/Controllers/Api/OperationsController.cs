using DataBaseWithBusinessLogicConnector.ApiEntities;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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
        public IActionResult Get()
        {
            try
            {
                var result = JsonConvert.SerializeObject(_repository.GetOperations(), Formatting.Indented, new JsonSerializerSettings() { ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore } );
                var tmp = _repository.GetOperations();
                var rasult2 = _repository.GetDalOperations(tmp);

                return Ok(result);
            }
            catch (Exception)
            {
                return BadRequest("Failed");
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody]ApiOperation operation)
        {
            try
            {
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest("Failed");
            }
        }
    }
}
