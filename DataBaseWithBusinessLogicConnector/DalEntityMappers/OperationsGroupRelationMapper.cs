using DataBaseWithBusinessLogicConnector.DalEntities;
using DataBaseWithBusinessLogicConnector.Entities;
using System.Collections.Generic;
using System.Linq;

namespace DataBaseWithBusinessLogicConnector.DalEntityMappers
{
    public class OperationsGroupRelationMapper
    {
        public List<Tag> _tags;
        public List<OperationsGroup> _groups;

        public OperationsGroupRelationMapper() { }

        public void Update(List<OperationsGroup> groups, List<Tag> tags)
        {
            _tags = tags;
            _groups = groups;
        }

        public void ConvertToBusinessLogicEntitiesCollection(IEnumerable<DalOperationsGroupTag> dataEntities)
        {
            foreach (var item in dataEntities)
            {
                ConvertToBusinessLogicEntity(item);
            }
        }

        public void ConvertToBusinessLogicEntity(DalOperationsGroupTag dataEntity)
        {
            var operation = _groups.First(o => o.Id == dataEntity.OperationsGroupId);
            var tag = _tags.First(t => t.Id == dataEntity.TagId);

            operation.AddTag(tag);
        }
    }
}
