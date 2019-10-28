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
                result = JsonHelper.JsonArrayWithoutTags(result,"IsDirty","IsMarkForDeletion");
                return Ok(result);
            }
            catch (Exception)
            {
                return BadRequest("Failed");
            }
        }

        [HttpGet("{withoutParent:bool}")]
        public IActionResult Get(bool withoutParent)
        {
            try
            {
                var result = JsonConvert.SerializeObject(_repository.GetOperations(withoutParent), Formatting.Indented, new JsonSerializerSettings() { ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore });
                result = JsonHelper.JsonArrayWithoutTags(result, "IsDirty", "IsMarkForDeletion");
                return Ok(result);
            }
            catch (Exception)
            {
                return BadRequest("Failed");
            }
        }

        [HttpGet("{from}/{to}/{withoutParent:bool}")]
        public IActionResult Get(string from, string to, bool withoutParent)
        {
            try
            {
                DateTime dtFrom = DateTime.Parse(from);
                DateTime dtTo = DateTime.Parse(to);
                var result = JsonConvert.SerializeObject(_repository.GetOperations(dtFrom,dtTo,withoutParent), Formatting.Indented, new JsonSerializerSettings() { ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore });
                result = JsonHelper.JsonArrayWithoutTags(result, "IsDirty", "IsMarkForDeletion");
                return Ok(result);
            }
            catch (Exception)
            {
                return BadRequest("Failed");
            }
        }

        [HttpGet("{from}/{to}/{query}")]
        public IActionResult Get(string from, string to, string query)
        {
            try
            {
                DateTime dtFrom = DateTime.Parse(from);
                DateTime dtTo = DateTime.Parse(to);
                var result = JsonConvert.SerializeObject(_repository.GetFilteredOperations(dtFrom, dtTo, query), Formatting.Indented, new JsonSerializerSettings() { ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore });
                result = JsonHelper.JsonArrayWithoutTags(result, "IsDirty", "IsMarkForDeletion");
                return Ok(result);
            }
            catch (Exception)
            {
                return BadRequest("Failed");
            }
        }

        [HttpGet("{query}")]
        public IActionResult Get(string query)
        {
            try
            {
                var result = JsonConvert.SerializeObject(_repository.GetFilteredOperations(query), Formatting.Indented, new JsonSerializerSettings() { ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore });
                result = JsonHelper.JsonArrayWithoutTags(result, "IsDirty", "IsMarkForDeletion");
                return Ok(result);
            }
            catch (Exception)
            {
                return BadRequest("Failed");
            }
        }

        [HttpGet("{from}/{to}")]
        public IActionResult Get(string from, string to)
        {
            try
            {
                DateTime dtFrom = DateTime.Parse(from);
                DateTime dtTo = DateTime.Parse(to);
                var result = JsonConvert.SerializeObject(_repository.GetOperations(dtFrom, dtTo), Formatting.Indented, new JsonSerializerSettings() { ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore });
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
                var result = JsonConvert.SerializeObject(_repository.GetOperation(id), Formatting.Indented, new JsonSerializerSettings() { ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore });
                result = JsonHelper.JsonWithoutTags(result, "IsDirty", "IsMarkForDeletion");
                return Ok(result);
            }
            catch (Exception)
            {
                return BadRequest("Failed");
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody]ApiOperation operation)
        { //TODO: validators
            try
            {
                _repository.UpdateOperationComplex(operation);

                return Created($"api/operations/{1}", operation); //TODO: not hardcode 1
            }
            catch (Exception)
            {
                return BadRequest("Failed");
            }
        }
    }
}
