using DataBaseWithBusinessLogicConnector.ApiEntities;
using Microsoft.AspNetCore.Mvc;
using PayglService;
using PayglWeb.Controllers.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayglWeb.Controllers.Api
{
    [Route("api/[Controller]")]
    public class SchematicsController : Controller
    {
        private readonly IRepository _repository;
        public SchematicsController(IRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var json = JsonHelper.JsonFromArray(_repository.GetSchematics(), "IsDirty", "IsMarkForDeletion");
                return Ok(json);
            }
            catch (Exception)
            {
                return BadRequest("Failed");
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody]ApiSchematic schematic)
        { //TODO: validators
            try
            {
                _repository.UpdateSchematic(schematic);

                return Created($"api/schematics/{1}", schematic); //TODO: not hardcode 1
            }
            catch (Exception)
            {
                return BadRequest("Failed");
            }
        }
    }
}
