using DataBaseWithBusinessLogicConnector.Interfaces.Dal;

namespace DataBaseWithBusinessLogicConnector.DalEntities
{
    public class DalOperationTags : IDalEntity
    {
        public int? Id { get; private set; }
        public bool IsDirty { get; set; }
        public int? OperationId { get; private set; }
        public int? TagId { get; private set; }

        public DalOperationTags(int? id, int? operationId, int? tagId)
        {
            Id = id;
            OperationId = operationId;
            TagId = tagId;
        }
    }
}
