using DataBaseWithBusinessLogicConnector.ApiEntities;
using DataBaseWithBusinessLogicConnector.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.ApiEntityMappers
{
    public class UserDetailsMapper
    {
        public IEnumerable<UserDetails> ConvertToEntitiesCollection(IEnumerable<ApiUserDetails> dataEntities)
        {
            var result = new List<UserDetails>();
            foreach (var item in dataEntities)
            {
                result.Add(ConvertToEntity(item));
            }

            return result;
        }

        public UserDetails ConvertToEntity(ApiUserDetails dataEntity)
        {
            var result = new UserDetails(dataEntity.Id, dataEntity.LastName, dataEntity.FirstName);
            return result;
        }

        public IEnumerable<ApiUserDetails> ConvertToApiEntitiesCollection(IEnumerable<UserDetails> dataEntities)
        {
            var result = new List<ApiUserDetails>();
            foreach (var item in dataEntities)
            {
                result.Add(ConvertToApiEntity(item));
            }

            return result;
        }

        public ApiUserDetails ConvertToApiEntity(UserDetails dataEntity)
        {
            var result = new ApiUserDetails(dataEntity.Id, dataEntity.LastName, dataEntity.FirstName);
            return result;
        }
    }
}
