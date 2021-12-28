using DataBaseWithBusinessLogicConnector.Interfaces;
using DataBaseWithBusinessLogicConnector.Interfaces.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.ApiEntities
{
    public class ApiFilter : IEntity, IApiFilter
    {
        public int? Id { get; set; }
        public bool IsDirty { get; set; }
        public bool IsMarkForDeletion { get; set; }
        public ApiUser User { get; set; }
        public string Name { get; set; }
        public string Query { get; set; }

        public ApiFilter() { }

        public ApiFilter(int? id, ApiUser user, string name, string query)
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
