using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.DalEntities
{
    public class DashboardComplex
    {
        public DalDashboard Dashboard { get; private set; }
        public IEnumerable<DalDashboardFilterRelation> Relations { get; private set; }

        public DashboardComplex(DalDashboard dashboard, IEnumerable<DalDashboardFilterRelation> relations)
        {
            Dashboard = dashboard;
            Relations = relations;
        }
    }
}
