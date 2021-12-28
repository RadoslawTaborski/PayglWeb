using DataBaseWithBusinessLogicConnector.ApiEntities;
using DataBaseWithBusinessLogicConnector.DalEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.DalApiMappers
{
    public class FrequencyMapper
    {
        public IEnumerable<ApiFrequency> ConvertToApiEntitiesCollection(IEnumerable<DalFrequency> dataEntities)
        {
            var result = new List<ApiFrequency>();
            foreach (var item in dataEntities)
            {
                result.Add(ConvertToApiEntity(item));
            }

            return result;
        }

        public ApiFrequency ConvertToApiEntity(DalFrequency dataEntity)
        {
            var result = new ApiFrequency(dataEntity.Id, dataEntity.Text);
            result.IsDirty = dataEntity.IsDirty;
            result.IsMarkForDeletion = dataEntity.IsMarkForDeletion;
            return result;
        }
    }
}
