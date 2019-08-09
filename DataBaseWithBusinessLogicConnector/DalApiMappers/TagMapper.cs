using DataBaseWithBusinessLogicConnector.ApiEntities;
using DataBaseWithBusinessLogicConnector.DalEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.DalApiMappers
{
    public class TagMapper
    {
        public IEnumerable<ApiTag> ConvertToApiEntitiesCollection(IEnumerable<DalTag> dataEntities)
        {
            var result = new List<ApiTag>();
            foreach (var item in dataEntities)
            {
                result.Add(ConvertToApiEntity(item));
            }

            return result;
        }

        public ApiTag ConvertToApiEntity(DalTag dataEntity)
        {
            var result = new ApiTag(dataEntity.Id, dataEntity.Text);
            return result;
        }
    }
}
