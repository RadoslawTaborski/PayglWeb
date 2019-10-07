using DataBaseWithBusinessLogicConnector.Interfaces.Dal;

namespace DataBaseWithBusinessLogicConnector.DalEntities
{
    public class DalOperationsGroupTags : IDalEntity
    {
        public int? Id { get; private set; }
        public bool IsDirty { get; set; }
        public bool IsMarkForDeletion { get; set; }
        public int? OperationsGroupId { get; private set; }
        public int? TagId { get; private set; }

        public DalOperationsGroupTags(int? id, int? operationsGroupId, int? tagId)
        {
            Id = id;
            OperationsGroupId = operationsGroupId;
            TagId = tagId;
        }
        public void UpdateId(int id)
        {
            Id = id;
        }
    }
}
