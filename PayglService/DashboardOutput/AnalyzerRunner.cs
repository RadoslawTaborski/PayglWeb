using DataBaseWithBusinessLogicConnector.Entities;
using DataBaseWithBusinessLogicConnector.Interfaces;
using System.Collections.Generic;

namespace PayglService.DashboardOutputElements
{
    public class AnalyzerRunner
    {
        public List<IOperation> Run(Filter filter, List<IOperation> operations)
        {
            var query = Analyzer.Analyzer.StringToQuery(filter.Query);
            var result = Analyzer.Analyzer.FilterOperations(operations, query);
            result.Sort((x, y) => x.Date.CompareTo(y.Date));

            return result;
        }
    }
}
