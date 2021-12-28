using DataBaseWithBusinessLogicConnector.Interfaces;
using DataBaseWithBusinessLogicConnector.Interfaces.Api;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.ApiEntities
{
    public class ApiDashboardFilterRelation : IEntity
    {
        public int? Id { get; set; }
        public bool IsDirty { get; set; }
        public bool IsMarkForDeletion { get; set; }

        [JsonConverter(typeof(IFilterConverter))]
        public IApiFilter Filter { get; set; }
        public bool IsVisible { get; set; }
        public int Order { get; set; }

        public ApiDashboardFilterRelation() { }

        public ApiDashboardFilterRelation(int? id, IApiFilter filter, bool isVisible, int order)
        {
            Id = id;
            Filter = filter;
            IsVisible = isVisible;
            Order = order;
        }

        public void UpdateId(int? id)
        {
            Id = id;
        }
    }
}
