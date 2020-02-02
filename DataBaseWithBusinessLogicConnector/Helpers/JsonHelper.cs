using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.Helpers
{
    public static class JsonHelper
    {
        public static string JsonFromObject(object entity, params string[] tagsToRemove)
        {
            var temp = JObject.FromObject(entity);
            temp.Descendants()
                .OfType<JProperty>()
                .Where(attr => tagsToRemove.Contains(attr.Name))
                .ToList()
                .ForEach(attr => attr.Remove());
            var json = temp.ToString();
            return json;
        }
    }
}
