namespace DataBaseWithBusinessLogicConnector.Interfaces.Dal
{
    public interface IDalEntity
    {
        int? Id { get; }
        bool IsDirty { get; set; }
        bool IsMarkForDeletion { get; set; }
    }
}
