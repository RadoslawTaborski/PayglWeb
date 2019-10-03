using DataBaseWithBusinessLogicConnector.ApiEntities;
using DataBaseWithBusinessLogicConnector.DalEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.DalApiMappers
{
    public class TransactionTypeMapper
    {
        public IEnumerable<ApiTransactionType> ConvertToApiEntitiesCollection(IEnumerable<DalTransactionType> dataEntities)
        {
            var result = new List<ApiTransactionType>();
            foreach (var item in dataEntities)
            {
                result.Add(ConvertToApiEntity(item));
            }

            return result;
        }

        public ApiTransactionType ConvertToApiEntity(DalTransactionType dataEntity)
        {
            var result = new ApiTransactionType(dataEntity.Id, dataEntity.Text);
            result.IsDirty = dataEntity.IsDirty;
            result.IsMarkForDeletion = dataEntity.IsMarkForDeletion;
            return result;
        }
    }
}
