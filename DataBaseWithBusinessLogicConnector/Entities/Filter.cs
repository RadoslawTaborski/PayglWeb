using DataBaseWithBusinessLogicConnector.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.Entities
{
    public class Filter : IEntity, IFilter
    {
        public int? Id { get; private set; }
        public bool IsDirty { get; set; }
        public bool IsMarkForDeletion { get; set; }
        public User User { get; private set; }
        public string Name { get; private set; }
        public string Query { get; private set; }

        public Filter(int? id, User user, string name, string query)
        {
            Id = id;
            User = user;
            Name = name;
            Query = query;
        }

        public void UpdateId(int? id)
        {
            Id = id;
        }

        public override string ToString()
        {
            return $"{Name}: {Query}";
        }
    }
}
