using DataBaseWithBusinessLogicConnector.ApiEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.Helpers
{
    public class ApiRelTagComparer : IEqualityComparer<ApiRelTag>, IComparer<ApiRelTag>
    {
        public int Compare(ApiRelTag x, ApiRelTag y)
        {
            if (x.Tag.Text.ToLower() == y.Tag.Text.ToLower())
            {
                return 0;
            }
            if (!x.Id.HasValue)
            {
                return -1;
            }
            if (!y.Id.HasValue)
            {
                return 1;
            }
            if (x.Id.Value > y.Id.Value)
            {
                return 1;
            }
            else
            {
                return -1;
            }
        }

        public bool Equals(ApiRelTag x, ApiRelTag y)
        {
            if (x.Tag.Text.ToLower() == y.Tag.Text.ToLower())
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public int GetHashCode(ApiRelTag obj)
        {
            return obj.Tag.Text.ToLower().GetHashCode();
        }
    }
}
