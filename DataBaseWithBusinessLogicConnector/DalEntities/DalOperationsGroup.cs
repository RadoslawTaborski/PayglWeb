using DataBaseWithBusinessLogicConnector.Interfaces.Dal;

namespace DataBaseWithBusinessLogicConnector.DalEntities
{
    public class DalOperationsGroup: IDalEntity
    {
        public int? Id { get; private set; }
        public bool IsDirty { get; set; }
        public bool IsMarkForDeletion { get; set; }
        public int? UserId { get; private set; }
        public string Description { get; private set; }
        public int? FrequencyId { get; private set; }
        public int? ImportanceId { get; private set; }
        public string Date { get; private set; }


        public DalOperationsGroup(int? id, int? userId, string description, int? frequencyId, int? importanceId, string date)
        {
            Id = id;
            UserId = userId;
            Description = description;
            FrequencyId = frequencyId;
            ImportanceId = importanceId;
            Date = date;
        }
    }
}
