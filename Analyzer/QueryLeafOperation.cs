using System;
using System.Collections.Generic;
using DataBaseWithBusinessLogicConnector.Interfaces.Api;

namespace Analyzer
{
    public class QueryLeafOperation: IQueryItem
    {
        public string Operation { get; private set; }
        public List<IApiOperation> Result => throw new NotImplementedException();
        public bool OnlyOperations => throw new NotImplementedException();

        public QueryLeafOperation(string operation)
        {
            Operation = operation;
        }

        public void SetOperation(string operation)
        {
            Operation = operation;
        }

        public override string ToString()
        {
            return Operation;
        }

        public void Filter(List<IApiOperation> all)
        {
            throw new NotImplementedException();
        }
    }
}
