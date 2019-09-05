namespace DataBaseWithBusinessLogicConnector.DalEntities
{
    public class DalOperationsGroupTags
    {
        public int? Id { get; private set; }
        public bool IsDirty { get; set; }
        public int? OperationsGroupId { get; private set; }
        public int? TagId { get; private set; }

        public DalOperationsGroupTags(int? id, int? operationsGroupId, int? tagId)
        {
            Id = id;
            OperationsGroupId = operationsGroupId;
            TagId = tagId;
        }
    }
}
