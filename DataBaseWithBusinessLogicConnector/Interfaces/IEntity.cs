namespace DataBaseWithBusinessLogicConnector.Interfaces
{
    public interface IEntity
    {
        int? Id { get; }

        void UpdateId(int? id);
    }
}
