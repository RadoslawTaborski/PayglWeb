namespace DataBaseWithBusinessLogicConnector.Interfaces
{
    public interface IEntity
    {
        int? Id { get; }
        bool IsDirty { get; set; }
        bool IsMarkForDeletion { get; set; }

        void UpdateId(int? id);
    }
}
