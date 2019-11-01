using DataBaseWithBusinessLogicConnector.Interfaces.Dal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.DalEntities
{
    public class DalFilter : IDalEntity
    {
        public int? Id { get; private set; }
        public bool IsDirty { get; set; }
        public bool IsMarkForDeletion { get; set; }
        public int? UserId { get; private set; }
        public string Name { get; private set; }
        public string Query { get; private set; }

        public DalFilter(int? id, int? userId, string name, string query)
        {
            Id = id;
            UserId = userId;
            Name = name;
            Query = query;
        }
    }
}
