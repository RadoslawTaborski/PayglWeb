using Microsoft.AspNetCore.Mvc;
using PayglService;
using PayglWeb.Controllers.Helpers;
using System;

namespace PayglWeb.Controllers.Api
{
    [Route("api/[Controller]")]
    public class DashboardsOutputsController : Controller
    {
        private readonly IRepository _repository;
        public DashboardsOutputsController(IRepository repository)
        {
            _repository = repository;
        }

        [HttpGet()]
        public IActionResult Get()
        {
            try
            {
                var json = JsonHelper.JsonFromArray(_repository.GetDashboardsOutputs(), "IsDirty", "IsMarkForDeletion");
                return Ok(json);
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
                var result = JsonHelper.JsonFromArray(_repository.GetDashboardsOutputs(dtFrom, dtTo), "IsDirty", "IsMarkForDeletion");
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
                var json = JsonHelper.JsonFromObject(_repository.GetDashboardOutput(id), "IsDirty", "IsMarkForDeletion");
                return Ok(json);
            }
            catch (Exception)
            {
                return BadRequest("Failed");
            }
        }

        [HttpGet("{id:int}/{from}/{to}")]
        public IActionResult Get(int id, string from, string to)
        {
            try
            {
                DateTime dtFrom = DateTime.Parse(from);
                DateTime dtTo = DateTime.Parse(to);
                var result = JsonHelper.JsonFromObject(_repository.GetDashboardOutput(id, dtFrom, dtTo), "IsDirty", "IsMarkForDeletion");
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
            if(query == "null")
            {
                query = "";
            }
            try
            {
                var result = JsonHelper.JsonFromObject(_repository.GetDashboardOutput(query), "IsDirty", "IsMarkForDeletion");
                return Ok(result);
            }
            catch (Exception)
            {
                return BadRequest("Failed");
            }
        }

        [HttpGet("{query}/{from}/{to}")]
        public IActionResult Get(string query, string from, string to)
        {
            if (query == "null")
            {
                query = "";
            }
            try
            {
                DateTime dtFrom = DateTime.Parse(from);
                DateTime dtTo = DateTime.Parse(to);
                var result = JsonHelper.JsonFromObject(_repository.GetDashboardOutput(query, dtFrom, dtTo), "IsDirty", "IsMarkForDeletion");
                return Ok(result);
            }
            catch (Exception)
            {
                return BadRequest("Failed");
            }
        }
    }
}
