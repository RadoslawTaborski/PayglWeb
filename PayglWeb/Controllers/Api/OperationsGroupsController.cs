using DataBaseWithBusinessLogicConnector.ApiEntities;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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
    public class OperationsGroupsController : Controller
    {
        private readonly IRepository _repository;
        public OperationsGroupsController(IRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var result = JsonConvert.SerializeObject(_repository.GetOperationsGroups(), Formatting.Indented, new JsonSerializerSettings() { ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore });
                result = JsonHelper.JsonArrayWithoutTags(result, "IsDirty", "IsMarkForDeletion");
                return Ok(result);
            }
            catch (Exception)
            {
                return BadRequest("Failed");
            }
        }

        [HttpGet("{from}/{to}")]
        public IActionResult Get(string from, string to, bool withoutParent)
        {
            try
            {
                DateTime dtFrom = DateTime.Parse(from);
                DateTime dtTo = DateTime.Parse(to);
                var result = JsonConvert.SerializeObject(_repository.GetOperationsGroups(dtFrom, dtTo), Formatting.Indented, new JsonSerializerSettings() { ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore });
                result = JsonHelper.JsonArrayWithoutTags(result, "IsDirty", "IsMarkForDeletion");
                return Ok(result);
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
                var result = JsonConvert.SerializeObject(_repository.GetOperationsGroup(id), Formatting.Indented, new JsonSerializerSettings() { ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore });
                result = JsonHelper.JsonWithoutTags(result, "IsDirty", "IsMarkForDeletion");
                return Ok(result);
            }
            catch (Exception)
            {
                return BadRequest("Failed");
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody]ApiOperationsGroup group)
        { //TODO: validators
            try
            {
                _repository.UpdateOperationsGroupComplex(group);

                return Created($"api/operationsgroups/{1}",group); //TODO: not hardcode 1
            }
            catch (Exception)
            {
                return BadRequest("Failed");
            }
        }
    }
}
