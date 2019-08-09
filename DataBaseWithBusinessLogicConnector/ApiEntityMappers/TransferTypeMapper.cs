using DataBaseWithBusinessLogicConnector.ApiEntities;
using DataBaseWithBusinessLogicConnector.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.ApiEntityMappers
{
    public class TransferTypeMapper
    {
        public IEnumerable<TransferType> ConvertToEntitiesCollection(IEnumerable<ApiTransferType> dataEntities)
        {
            var result = new List<TransferType>();
            foreach (var item in dataEntities)
            {
                result.Add(ConvertToEntity(item));
            }

            return result;
        }

        public TransferType ConvertToEntity(ApiTransferType dataEntity)
        {
            var result = new TransferType(dataEntity.Id, dataEntity.Text);
            return result;
        }

        public IEnumerable<ApiTransferType> ConvertToApiEntitiesCollection(IEnumerable<TransferType> dataEntities)
        {
            var result = new List<ApiTransferType>();
            foreach (var item in dataEntities)
            {
                result.Add(ConvertToApiEntity(item));
            }

            return result;
        }

        public ApiTransferType ConvertToApiEntity(TransferType dataEntity)
        {
            var result = new ApiTransferType(dataEntity.Id, dataEntity.Text);
            return result;
        }
    }
}
