using DataBaseWithBusinessLogicConnector.DalEntities;
using DataBaseWithBusinessLogicConnector.Entities;
using System.Collections.Generic;
using System.Linq;

namespace DataBaseWithBusinessLogicConnector.DalEntityMappers
{
    public class OperationRelationMapper
    {
        public List<Operation> _operations;
        public List<Tag> _tags;

        public void Update(List<Operation> operations, List<Tag> tags)
        {
            _operations = operations;
            _tags = tags;
        }

        public void ConvertToBusinessLogicEntitiesCollection(IEnumerable<DalOperationTags> dataEntities)
        {
            foreach (var item in dataEntities)
            {
                ConvertToBusinessLogicEntity(item);
            }
        }

        public void ConvertToBusinessLogicEntity(DalOperationTags dataEntity)
        {
            var operation = _operations.First(o => o.Id == dataEntity.OperationId);
            var tag = _tags.First(t => t.Id == dataEntity.TagId);

            operation.AddTag(tag);
        }
    }
}
