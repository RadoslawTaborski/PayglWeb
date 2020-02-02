using DataBaseWithBusinessLogicConnector.Interfaces.Dal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.DalEntities
{
    public class DalSchematicType : IDalEntity
    {
        public int? Id { get; private set; }
        public bool IsDirty { get; set; }
        public bool IsMarkForDeletion { get; set; }
        public string Name { get; private set; }

        public DalSchematicType(int? id, string name)
        {
            Id = id;
            Name = name;
        }
    }
}
