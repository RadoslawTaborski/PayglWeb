using DataBaseWithBusinessLogicConnector.Interfaces;
using DataBaseWithBusinessLogicConnector.Interfaces.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.ApiEntities
{
    public class ApiDashboard : IEntity, IApiFilter
    {
        public int? Id { get; set; }
        public bool IsDirty { get; set; }
        public bool IsMarkForDeletion { get; set; }
        public ApiUser User { get; set; }
        public string Name { get; set; }
        public bool IsVisible { get; set; }
        public List<ApiDashboardFilterRelation> Relations { get; set; }
        public int Order { get; set; }

        public ApiDashboard() { }

        public ApiDashboard(int? id, ApiUser user, string name, bool isVisible, int order)
        {
            Id = id;
            User = user;
            Name = name;
            IsVisible = isVisible;
            Order = order;
            Relations = new List<ApiDashboardFilterRelation>();
        }

        public void UpdateRelations(IEnumerable<ApiDashboardFilterRelation> relations)
        {
            Relations = relations.OrderBy(o => o.Order).ToList();
        }

        public void UpdateId(int? id)
        {
            Id = id;
        }

        public override string ToString()
        {
            var visible = IsVisible ? "enable" : "disable";
            return $"{Name}: {visible}";
        }
    }
}
