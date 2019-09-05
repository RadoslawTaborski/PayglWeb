using DataBaseWithBusinessLogicConnector.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace DataBaseWithBusinessLogicConnector.Entities
{
    public class Tag : IEntity, IParameter
    {
        public int? Id { get; private set; }
        public bool IsDirty { get; set; }
        public string Text { get; private set; }

        public Tag(int? id, string text)
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
