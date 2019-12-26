using DataBaseWithBusinessLogicConnector.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.Entities
{
    public class DashboardFilterRelation : IEntity
    {
        public int? Id { get; private set; }
        public bool IsDirty { get; set; }
        public bool IsMarkForDeletion { get; set; }
        public IFilter Filter { get; private set; }
        public bool IsVisible { get; private set; }
        public int Order { get; private set; }

        public DashboardFilterRelation(int? id, IFilter filter, bool isVisible, int order)
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
