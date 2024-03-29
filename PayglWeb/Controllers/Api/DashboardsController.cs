﻿using DataBaseWithBusinessLogicConnector.ApiEntities;
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
    public class DashboardsController : Controller
    {
        private readonly IRepository _repository;
        public DashboardsController(IRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var json = JsonHelper.JsonFromArray(_repository.GetDashboards(), "IsDirty", "IsMarkForDeletion");
                return Ok(json);
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
                var json = JsonHelper.JsonFromObject(_repository.GetDashboard(id), "IsDirty", "IsMarkForDeletion");
                return Ok(json);
            }
            catch (Exception)
            {
                return BadRequest("Failed");
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody]Boards boards)
        { //TODO: validators
            try
            {
                _repository.UpdateDashboards(boards.Dashboards);

                return Created($"api/dashboards/", boards); //TODO: not hardcode 1
            }
            catch (Exception)
            {
                return BadRequest("Failed");
            }
        }
    }

    public class Boards
    {
        public ApiDashboard[] Dashboards { get; set; }

        public Boards() { }
    }
}
