using DataBaseWithBusinessLogicConnector.ApiEntities;
using DataBaseWithBusinessLogicConnector.DalEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.DalApiMappers
{
    public class UserDetailsMapper
    {
        public IEnumerable<ApiUserDetails> ConvertToApiEntitiesCollection(IEnumerable<DalUserDetails> dataEntities)
        {
            var result = new List<ApiUserDetails>();
            foreach (var item in dataEntities)
            {
                result.Add(ConvertToApiEntity(item));
            }

            return result;
        }

        public ApiUserDetails ConvertToApiEntity(DalUserDetails dataEntity)
        {
            var result = new ApiUserDetails(dataEntity.Id, dataEntity.LastName, dataEntity.FirstName);
            result.IsDirty = dataEntity.IsDirty;
            result.IsMarkForDeletion = dataEntity.IsMarkForDeletion;
            return result;
        }
    }
}
