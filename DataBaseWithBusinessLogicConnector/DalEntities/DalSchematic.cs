using DataBaseWithBusinessLogicConnector.Interfaces.Dal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.DalEntities
{
    public class DalSchematic : IDalEntity
    {
        public int? Id { get; private set; }
        public bool IsDirty { get; set; }
        public bool IsMarkForDeletion { get; set; }
        public int? TypeId { get; private set; }
        public string Json { get; private set; }
        public int? UserId { get; private set; }

        public DalSchematic(int? id, int? typeId, string json, int? userId)
        {
            Id = id;
            UserId = userId;
            Json = json;
            TypeId = typeId;
        }
    }
}
