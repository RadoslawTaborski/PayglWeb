using DataBaseWithBusinessLogicConnector.ApiEntities;
using DataBaseWithBusinessLogicConnector.Interfaces.Api;
using System.Collections.Generic;

namespace PayglService.DashboardOutputElements
{
    public class AnalyzerRunner
    {
        public List<IApiOperation> Run(ApiFilter filter, List<IApiOperation> operations)
        {
            var query = Analyzer.Analyzer.StringToQuery(filter.Query);
            var result = Analyzer.Analyzer.FilterOperations(operations, query);
            result.Sort((x, y) => x.Date.CompareTo(y.Date));

            return result;
        }
    }
}
