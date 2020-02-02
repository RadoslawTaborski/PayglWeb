using DataBaseWithBusinessLogicConnector.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.ApiEntities
{
    public class ApiBank : IEntity
    {
        public int? Id { get; set; }
        public bool IsDirty { get; set; }
        public bool IsMarkForDeletion { get; set; }
        public string Name { get; set; }

        public ApiBank() { }

        public ApiBank(int? id, string name)
        {
            Id = id;
            Name = name;
        }

        public void UpdateId(int? id)
        {
            Id = id;
        }

        public override string ToString()
        {
            return $"{Id}: {Name}";
        }
    }
}
