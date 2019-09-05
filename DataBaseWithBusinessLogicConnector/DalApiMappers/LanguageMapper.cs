using DataBaseWithBusinessLogicConnector.ApiEntities;
using DataBaseWithBusinessLogicConnector.DalEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.DalApiMappers
{
    public class LanguageMapper
    {
        public IEnumerable<ApiLanguage> ConvertToApiEntitiesCollection(IEnumerable<DalLanguage> dataEntities)
        {
            var result = new List<ApiLanguage>();
            foreach (var item in dataEntities)
            {
                result.Add(ConvertToApiEntity(item));
            }

            return result;
        }

        public ApiLanguage ConvertToApiEntity(DalLanguage dataEntity)
        {
            var result = new ApiLanguage(dataEntity.Id, dataEntity.ShortName, dataEntity.FullName);
            result.IsDirty = dataEntity.IsDirty;
            return result;
        }
    }
}
