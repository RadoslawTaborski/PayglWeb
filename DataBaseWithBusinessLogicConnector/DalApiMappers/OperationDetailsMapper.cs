using DataBaseWithBusinessLogicConnector.ApiEntities;
using DataBaseWithBusinessLogicConnector.DalEntities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataBaseWithBusinessLogicConnector.DalApiMappers
{
    public class OperationDetailsMapper
    {
        public IEnumerable<ApiOperationDetails> ConvertToApiEntitiesCollection(IEnumerable<DalOperationDetails> dataEntities)
        {
            var result = new List<ApiOperationDetails>();
            foreach (var item in dataEntities)
            {
                result.Add(ConvertToApiEntity(item));
            }

            return result;
        }

        public ApiOperationDetails ConvertToApiEntity(DalOperationDetails dataEntity)
        {
            var result = new ApiOperationDetails(dataEntity.Id, dataEntity.Name, dataEntity.Quantity, dataEntity.Amount);
            result.IsDirty = dataEntity.IsDirty;
            result.IsMarkForDeletion = dataEntity.IsMarkForDeletion;
            return result;
        }
    }
}
