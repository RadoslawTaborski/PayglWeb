using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.DalEntities
{
    public class OperationsGroupComplex
    {
        public DalOperationsGroup Group { get; private set; }
        public IEnumerable<DalOperationsGroupTags> Tags { get; private set; }
        public IEnumerable<OperationComplex> Operations { get; private set; }
        public OperationsGroupComplex(DalOperationsGroup group, IEnumerable<DalOperationsGroupTags> tags, IEnumerable<OperationComplex> operations)
        {
            Group = group;
            Tags = tags;
            Operations = operations;
        }
    }
}
