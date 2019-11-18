using DataBaseWithBusinessLogicConnector.Interfaces;
using Newtonsoft.Json.Linq;
using PayglService.DashboardOutputElements;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PayglWeb.Controllers.Helpers
{
    public static class JsonHelper
    {
        public static string JsonFromArray(IEnumerable<object> collection, params string[] tagsToRemove)
        {
            var temp = JArray.FromObject(collection);
            temp.Descendants()
                .OfType<JProperty>()
                .Where(attr => tagsToRemove.Contains(attr.Name))
                .ToList()
                .ForEach(attr => attr.Remove());
            var json = temp.ToString();
            return json;
        }

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

        public static string JsonArrayWithoutTags(string jsonArray, params string[] tagsToRemove)
        {
            var temp = JArray.Parse(jsonArray);
            temp.Descendants()
                .OfType<JProperty>()
                .Where(attr => tagsToRemove.Contains(attr.Name))
                .ToList()
                .ForEach(attr => attr.Remove());
            var json = temp.ToString();
            return json;
        }

        public static string JsonWithoutTags(string jsonObject, params string[] tagsToRemove)
        {
            var temp = JObject.Parse(jsonObject);
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
