using DataBaseWithBusinessLogicConnector.ApiEntities;
using DataBaseWithBusinessLogicConnector.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.ApiEntityMappers
{
    public class ImportanceMapper
    {
        public IEnumerable<Importance> ConvertToEntitiesCollection(IEnumerable<ApiImportance> dataEntities)
        {
            var result = new List<Importance>();
            foreach (var item in dataEntities)
            {
                result.Add(ConvertToEntity(item));
            }

            return result;
        }

        public Importance ConvertToEntity(ApiImportance dataEntity)
        {
            var result = new Importance(dataEntity.Id, dataEntity.Text);
            result.IsDirty = dataEntity.IsDirty;
            result.IsMarkForDeletion = dataEntity.IsMarkForDeletion;
            return result;
        }

        public IEnumerable<ApiImportance> ConvertToApiEntitiesCollection(IEnumerable<Importance> dataEntities)
        {
            var result = new List<ApiImportance>();
            foreach (var item in dataEntities)
            {
                result.Add(ConvertToApiEntity(item));
            }

            return result;
        }

        public ApiImportance ConvertToApiEntity(Importance dataEntity)
        {
            var result = new ApiImportance(dataEntity.Id, dataEntity.Text);
            result.IsDirty = dataEntity.IsDirty;
            result.IsMarkForDeletion = dataEntity.IsMarkForDeletion;
            return result;
        }
    }
}
