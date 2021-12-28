using DataBaseWithBusinessLogicConnector.ApiEntities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PayglService;
using PayglService.Helpers;
using PayglWeb.Controllers.Helpers;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayglWeb.Controllers.Api
{
    [Route("api/[Controller]")]
    public class ImportController : Controller
    {
        private readonly IRepository _repository;

        public ImportController(IRepository repository)
        {
            _repository = repository;
        }

        [HttpPost("{id:int}")]
        public async Task<IActionResult> OnPostUploadAsync(int id, List<IFormFile> files)
        {
            var list = new List<ApiOperation>();

            foreach (var formFile in files)
            {
                if (formFile.Length > 0)
                {
                    list.AddRange(_repository.GetOperationsFromSchematics(id, await formFile.ReadAsStringAsync()));
                }
            }

            var result = JsonConvert.SerializeObject(list, Formatting.Indented, new JsonSerializerSettings() { ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore });
            result = JsonHelper.JsonArrayWithoutTags(result, "IsDirty", "IsMarkForDeletion");
            return Ok(result);
        }
    }
}
