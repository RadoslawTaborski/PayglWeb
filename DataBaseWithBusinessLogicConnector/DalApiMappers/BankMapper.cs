using DataBaseWithBusinessLogicConnector.ApiEntities;
using DataBaseWithBusinessLogicConnector.DalEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.DalApiMappers
{
    public class BankMapper
    {
        public IEnumerable<ApiBank> ConvertToApiEntitiesCollection(IEnumerable<DalBank> dataEntities)
        {
            var result = new List<ApiBank>();
            foreach (var item in dataEntities)
            {
                result.Add(ConvertToApiEntity(item));
            }

            return result;
        }

        public ApiBank ConvertToApiEntity(DalBank dataEntity)
        {
            var result = new ApiBank(dataEntity.Id, dataEntity.Name);
            result.IsDirty = dataEntity.IsDirty;
            result.IsMarkForDeletion = dataEntity.IsMarkForDeletion;
            return result;
        }
    }
}
