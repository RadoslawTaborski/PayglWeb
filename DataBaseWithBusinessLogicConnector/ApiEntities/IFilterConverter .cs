using DataBaseWithBusinessLogicConnector.Interfaces.Api;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataBaseWithBusinessLogicConnector.ApiEntities
{
    public class IFilterConverter : JsonConverter
    {
        public override bool CanWrite => false;
        public override bool CanRead => true;
        public override bool CanConvert(Type objectType)
        {
            return objectType == typeof(IApiFilter);
        }
        public override void WriteJson(JsonWriter writer,
            object value, JsonSerializer serializer)
        {
            throw new InvalidOperationException("Use default serialization.");
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            var jsonObject = JObject.Load(reader);
            IApiFilter iFilter;
            if (jsonObject["Relations"] != null)
            {
                iFilter = new ApiDashboard();
            } else
            {
                iFilter = new ApiFilter();
            }

            serializer.Populate(jsonObject.CreateReader(), iFilter);    
            return iFilter;
        }
    }
}
