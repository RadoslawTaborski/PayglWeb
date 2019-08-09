using DataBaseWithBusinessLogicConnector.ApiEntities;
using DataBaseWithBusinessLogicConnector.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.ApiEntityMappers
{
    public class OperationDetailsMapper
    {
        public IEnumerable<OperationDetails> ConvertToEntitiesCollection(IEnumerable<ApiOperationDetails> dataEntities)
        {
            var result = new List<OperationDetails>();
            foreach (var item in dataEntities)
            {
                result.Add(ConvertToEntity(item));
            }

            return result;
        }

        public OperationDetails ConvertToEntity(ApiOperationDetails dataEntity)
        {
            var result = new OperationDetails(dataEntity.Id, dataEntity.Name,dataEntity.Quantity,dataEntity.Amount);
            return result;
        }

        public IEnumerable<ApiOperationDetails> ConvertToApiEntitiesCollection(IEnumerable<OperationDetails> dataEntities)
        {
            var result = new List<ApiOperationDetails>();
            foreach (var item in dataEntities)
            {
                result.Add(ConvertToApiEntity(item));
            }

            return result;
        }

        public ApiOperationDetails ConvertToApiEntity(OperationDetails dataEntity)
        {
            var result = new ApiOperationDetails(dataEntity.Id, dataEntity.Name,dataEntity.Quantity, dataEntity.Amount);
            return result;
        }
    }
}
