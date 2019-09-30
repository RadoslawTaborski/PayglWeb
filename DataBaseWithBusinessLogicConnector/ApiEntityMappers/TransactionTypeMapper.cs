using DataBaseWithBusinessLogicConnector.ApiEntities;
using DataBaseWithBusinessLogicConnector.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.ApiEntityMappers
{
    public class TransactionTypeMapper
    {
        public IEnumerable<TransactionType> ConvertToEntitiesCollection(IEnumerable<ApiTransactionType> dataEntities)
        {
            var result = new List<TransactionType>();
            foreach (var item in dataEntities)
            {
                result.Add(ConvertToEntity(item));
            }

            return result;
        }

        public TransactionType ConvertToEntity(ApiTransactionType dataEntity)
        {
            var result = new TransactionType(dataEntity.Id, dataEntity.Text);
            result.IsDirty = dataEntity.IsDirty;
            result.IsMarkForDeletion = dataEntity.IsMarkForDeletion;
            return result;
        }

        public IEnumerable<ApiTransactionType> ConvertToApiEntitiesCollection(IEnumerable<TransactionType> dataEntities)
        {
            var result = new List<ApiTransactionType>();
            foreach (var item in dataEntities)
            {
                result.Add(ConvertToApiEntity(item));
            }

            return result;
        }

        public ApiTransactionType ConvertToApiEntity(TransactionType dataEntity)
        {
            var result = new ApiTransactionType(dataEntity.Id, dataEntity.Text);
            result.IsDirty = dataEntity.IsDirty;
            result.IsMarkForDeletion = dataEntity.IsMarkForDeletion;
            return result;
        }
    }
}
