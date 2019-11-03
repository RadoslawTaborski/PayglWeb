using DataBaseWithBusinessLogicConnector.Entities;
using DataBaseWithBusinessLogicConnector.Interfaces;
using System.Collections.Generic;

namespace PayglService.Models
{
    public class AnalyzerRunner
    {
        private Filter _filter;
        public List<IOperation> _operations;

        public AnalyzerRunner(Filter filter, List<IOperation> operations)
        {
            _filter = filter;
            _operations = operations;
        }

        public List<IOperation> Run()
        {
            var query = Analyzer.Analyzer.StringToQuery(_filter.Query);
            _operations = Analyzer.Analyzer.FilterOperations(_operations, query);
            _operations.Sort((x, y) => x.Date.CompareTo(y.Date));

            return _operations;
        }
    }
}
