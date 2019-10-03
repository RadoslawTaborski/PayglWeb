using DataBaseWithBusinessLogicConnector.Interfaces.Dal;

namespace DataBaseWithBusinessLogicConnector.DalEntities
{
    public class DalTransferType : IDalEntity
    {
        public int? Id { get; private set; }
        public bool IsDirty { get; set; }
        public bool IsMarkForDeletion { get; set; }
        public string Text { get; private set; }
        public int? LanguageId { get; private set; }

        public DalTransferType(int? id, string text, int? languageId)
        {
            Id = id;
            Text = text;
            LanguageId = languageId;
        }
    }
}
