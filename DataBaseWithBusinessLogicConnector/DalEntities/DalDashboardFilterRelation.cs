using DataBaseWithBusinessLogicConnector.Interfaces.Dal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.DalEntities
{
    public class DalDashboardFilterRelation : IDalEntity
    {
        public int? Id { get; private set; }
        public bool IsDirty { get; set; }
        public bool IsMarkForDeletion { get; set; }
        public int? DashboardId { get; private set; }
        public int? FilterTargetId { get; private set; }
        public int? DashboardTargetId { get; private set; }
        public bool IsVisible { get; private set; }
        public int? NextDashboardId { get; private set; }

        public DalDashboardFilterRelation(int? id, int? dashboardId, int? filterTargetId, int? dashboardTargetId, bool isVisible, int? nextDashboardId)
        {
            Id = id;
            DashboardId = dashboardId;
            FilterTargetId = filterTargetId;
            DashboardTargetId = dashboardTargetId;
            IsVisible = isVisible;
            NextDashboardId = nextDashboardId;
        }
    }
}
