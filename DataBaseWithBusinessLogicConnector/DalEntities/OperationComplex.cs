using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.DalEntities
{
    public class OperationComplex
    {
        public DalOperation Operation { get; private set; }
        public IEnumerable<DalOperationTags> Tags { get; private set; }
        public IEnumerable<DalOperationDetails> Details { get; private set; }

        public OperationComplex(DalOperation operation, IEnumerable<DalOperationTags> tags, IEnumerable<DalOperationDetails> details)
        {
            Operation = operation;
            Tags = tags;
            Details = details;
        }
    }
}
