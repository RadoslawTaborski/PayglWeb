using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.ApiEntities
{
    public class ApiLanguage
    {
        public int? Id { get;  set; }
        public string ShortName { get;  set; }
        public string FullName { get;  set; }

        public ApiLanguage(int? id, string shortName, string fullName)
        {
            Id = id;
            ShortName = shortName;
            FullName = fullName;
        }

        public ApiLanguage()
        {
        }
    }
}
