﻿using Microsoft.AspNetCore.Mvc;
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
    public class BanksController : Controller
    {
        private readonly IRepository _repository;
        public BanksController(IRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var json = JsonHelper.JsonFromArray(_repository.GetBanks(), "IsDirty", "IsMarkForDeletion");
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
                var json = JsonHelper.JsonFromObject(_repository.GetBanks(id), "IsDirty", "IsMarkForDeletion");
                return Ok(json);
            }
            catch (Exception)
            {
                return BadRequest("Failed");
            }
        }
    }
}