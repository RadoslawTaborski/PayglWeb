using DataBaseWithBusinessLogicConnector.Interfaces;
using DataBaseWithBusinessLogicConnector.Interfaces.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.ApiEntities
{
    public class ApiDashboardFilterRelation : IEntity
    {
        public int? Id { get; private set; }
        public bool IsDirty { get; set; }
        public bool IsMarkForDeletion { get; set; }
        public IApiFilter Filter { get; private set; }
        public bool IsVisible { get; private set; }
        public int? IndexOfNext { get; private set; }

        public ApiDashboardFilterRelation(int? id, IApiFilter filter, bool isVisible, int? indexOfNext)
        {
            Id = id;
            Filter = filter;
            IsVisible = isVisible;
            IndexOfNext = indexOfNext;
        }

        public void UpdateId(int? id)
        {
            Id = id;
        }
    }
}
