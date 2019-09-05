using DataBaseWithBusinessLogicConnector.ApiEntities;
using DataBaseWithBusinessLogicConnector.DalEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.DalApiMappers
{
    public class ImportanceMapper
    {
        public IEnumerable<ApiImportance> ConvertToApiEntitiesCollection(IEnumerable<DalImportance> dataEntities)
        {
            var result = new List<ApiImportance>();
            foreach (var item in dataEntities)
            {
                result.Add(ConvertToApiEntity(item));
            }

            return result;
        }

        public ApiImportance ConvertToApiEntity(DalImportance dataEntity)
        {
            var result = new ApiImportance(dataEntity.Id, dataEntity.Text);
            result.IsDirty = dataEntity.IsDirty;
            return result;
        }
    }
}
