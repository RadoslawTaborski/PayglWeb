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
    public class TransferTypesController : Controller
    {
        private readonly IRepository _repository;
        public TransferTypesController(IRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_repository.GetTransferTypes());
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
                return Ok(_repository.GetTransferType(id));
            }
            catch (Exception)
            {
                return BadRequest("Failed");
            }
        }
    }
}
