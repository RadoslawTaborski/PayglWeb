using DataBaseWithBusinessLogicConnector;
using DataBaseWithBusinessLogicConnector.ApiEntities;
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
        public void Generate(ref DashboardOutput input, ApiDashboard dashboard, List<IApiOperation> operations)
        {
            foreach (var relation in dashboard.Relations)
            {
                if (relation.Filter is ApiFilter)
                {
                    var filter = relation.Filter as ApiFilter;
                    var tmp = new DashboardOutputLeaf();
                    tmp.Name = filter.Name;
                    tmp.Result = _analyzer.Run(filter, operations);
                    input.Children.Add(tmp);
                }
                else
                {
                    var innerDashboard = relation.Filter as ApiDashboard;
                    var tmp = new DashboardOutput();
                    tmp.Name = innerDashboard.Name;
                    input.Children.Add(tmp);
                    Generate(ref tmp, innerDashboard, operations);
                }
            }
        }

        public void Generate(ref DashboardOutputLeaf input, string query, List<IApiOperation> operations)
        {
            var filter = new ApiFilter(0, null, "", query);
            input.Result = _analyzer.Run(filter, operations);
        }
    }
}
