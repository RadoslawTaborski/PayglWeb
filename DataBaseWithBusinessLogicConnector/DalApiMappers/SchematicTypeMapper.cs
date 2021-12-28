using DataBaseWithBusinessLogicConnector.ApiEntities;
using DataBaseWithBusinessLogicConnector.DalEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.DalApiMappers
{
    public class SchematicTypeMapper
    {
        public IEnumerable<ApiSchematicType> ConvertToApiEntitiesCollection(IEnumerable<DalSchematicType> dataEntities)
        {
            var result = new List<ApiSchematicType>();
            foreach (var item in dataEntities)
            {
                result.Add(ConvertToApiEntity(item));
            }

            return result;
        }

        public ApiSchematicType ConvertToApiEntity(DalSchematicType dataEntity)
        {
            var result = new ApiSchematicType(dataEntity.Id, dataEntity.Name);
            result.IsDirty = dataEntity.IsDirty;
            result.IsMarkForDeletion = dataEntity.IsMarkForDeletion;
            return result;
        }
    }
}
