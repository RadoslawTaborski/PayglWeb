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
        public int? Id { get; private set; }
        public bool IsDirty { get; set; }
        public bool IsMarkForDeletion { get; set; }
        public ApiUser User { get; private set; }
        public string Name { get; private set; }
        public bool IsVisible { get; private set; }
        public List<ApiDashboardFilterRelation> Relations { get; private set; }

        public ApiDashboard(int? id, ApiUser user, string name, bool isVisible, List<ApiDashboardFilterRelation> relations)
        {
            Id = id;
            User = user;
            Name = name;
            IsVisible = isVisible;
            Relations = relations;
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
