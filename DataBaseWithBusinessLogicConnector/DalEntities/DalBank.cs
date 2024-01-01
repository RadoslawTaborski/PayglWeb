using DataBaseWithBusinessLogicConnector.Interfaces.Dal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.DalEntities
{
    public class DalBank : IDalEntity
    {
        public int? Id { get; private set; }
        public bool IsDirty { get; set; }
        public bool IsMarkForDeletion { get; set; }
        public string Name { get; private set; }
        public string FileNamePrefix { get; private set; }

        public DalBank(int? id, string name, string fileNamePrefix)
        {
            Id = id;
            Name = name;
            FileNamePrefix = fileNamePrefix;
        }
    }
}
