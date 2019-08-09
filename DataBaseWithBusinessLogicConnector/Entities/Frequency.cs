using DataBaseWithBusinessLogicConnector.Interfaces;

namespace DataBaseWithBusinessLogicConnector.Entities
{
    public class Frequency : IEntity, IParameter
    {
        public int? Id { get; private set; }
        public string Text { get; private set; }

        public Frequency(int? id, string text)
        {
            Id = id;
            Text = text;
        }

        public void UpdateId(int? id)
        {
            Id = id;
        }

        public override string ToString()
        {
            return Text;
        }
    }
}
