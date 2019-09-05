using DataBaseWithBusinessLogicConnector.ApiEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.Helpers
{
    public class ApiOperationComparer : IEqualityComparer<ApiOperation>
    {
        public bool Equals(ApiOperation x, ApiOperation y)
        {
            if(!x.Id.HasValue || !y.Id.HasValue)
            {
                return false;
            }
            if (x.Id.Value == y.Id.Value)
            {
                return true;
            } else
            {
                return false;
            }
        }

        public int GetHashCode(ApiOperation obj)
        {
            return obj.Id.ToString().GetHashCode(); ;
        }
    }
}
