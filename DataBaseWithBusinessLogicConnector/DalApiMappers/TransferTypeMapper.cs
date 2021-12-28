using DataBaseWithBusinessLogicConnector.ApiEntities;
using DataBaseWithBusinessLogicConnector.DalEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.DalApiMappers
{
    public class TransferTypeMapper
    {
        public IEnumerable<ApiTransferType> ConvertToApiEntitiesCollection(IEnumerable<DalTransferType> dataEntities)
        {
            var result = new List<ApiTransferType>();
            foreach (var item in dataEntities)
            {
                result.Add(ConvertToApiEntity(item));
            }

            return result;
        }

        public ApiTransferType ConvertToApiEntity(DalTransferType dataEntity)
        {
            var result = new ApiTransferType(dataEntity.Id, dataEntity.Text);
            result.IsDirty = dataEntity.IsDirty;
            result.IsMarkForDeletion = dataEntity.IsMarkForDeletion;
            return result;
        }
    }
}
