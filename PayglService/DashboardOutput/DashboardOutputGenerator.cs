using DataBaseWithBusinessLogicConnector;
using DataBaseWithBusinessLogicConnector.ApiEntities;
using DataBaseWithBusinessLogicConnector.Entities;
using DataBaseWithBusinessLogicConnector.Interfaces;
using DataBaseWithBusinessLogicConnector.Interfaces.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayglService.DashboardOutputElements
{
    public class DashboardOutputGenerator
    {
        private AnalyzerRunner _analyzer = new AnalyzerRunner();
        public void Generate(ref DashboardOutput input, Dashboard dashboard, List<IOperation> operations, EntityAdapter adapter)
        {
            foreach (var relation in dashboard.Relations)
            {
                if (relation.Filter is Filter)
                {
                    var filter = relation.Filter as Filter;
                    var tmp = new DashboardOutputLeaf();
                    tmp.Name = filter.Name;
                    tmp.Result = adapter.GetIApiOperations(_analyzer.Run(filter, operations)).ToList();
                    input.Children.Add(tmp);
                }
                else
                {
                    var innerDashboard = relation.Filter as Dashboard;
                    var tmp = new DashboardOutput();
                    tmp.Name = innerDashboard.Name;
                    input.Children.Add(tmp);
                    Generate(ref tmp, innerDashboard, operations, adapter);
                }
            }
        }

        public void Generate(ref DashboardOutputLeaf input, string query, List<IOperation> operations, EntityAdapter adapter)
        {
            var filter = new Filter(0, null, "", query);
            input.Result = adapter.GetIApiOperations(_analyzer.Run(filter, operations)).ToList();
        }
    }
}
