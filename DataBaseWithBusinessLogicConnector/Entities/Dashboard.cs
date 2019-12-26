using DataBaseWithBusinessLogicConnector.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.Entities
{
    public class Dashboard : IEntity, IFilter
    {
        public int? Id { get; private set; }
        public bool IsDirty { get; set; }
        public bool IsMarkForDeletion { get; set; }
        public User User { get; private set; }
        public string Name { get; private set; }
        public bool IsVisible { get; private set; }
        public int Order { get; private set; }
        public List<DashboardFilterRelation> Relations { get; private set; }

        public Dashboard(int? id, User user, string name, bool isVisible, int order)
        {
            Id = id;
            User = user;
            Name = name;
            IsVisible = isVisible;
            Order = order;
        }

        public void UpdateRelations(List<DashboardFilterRelation> relations)
        {
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
