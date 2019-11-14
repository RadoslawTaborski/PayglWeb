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
    }
}
