using DataBaseWithBusinessLogicConnector.ApiEntities;
using DataBaseWithBusinessLogicConnector.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.ApiEntityMappers
{
    public class FilterMapper
    {
        private UserMapper _userMapper;

        public FilterMapper(UserMapper userMapper)
        {
            _userMapper = userMapper;
        }

        public IEnumerable<Filter> ConvertToEntitiesCollection(IEnumerable<ApiFilter> dataEntities)
        {
            var result = new List<Filter>();
            foreach (var item in dataEntities)
            {
                result.Add(ConvertToEntity(item));
            }

            return result;
        }

        public Filter ConvertToEntity(ApiFilter dataEntity)
        {
            var user = _userMapper.ConvertToEntity(dataEntity.User);
            var result = new Filter(dataEntity.Id, user, dataEntity.Name, dataEntity.Query);
            result.IsDirty = dataEntity.IsDirty;
            result.IsMarkForDeletion = dataEntity.IsMarkForDeletion;
            return result;
        }

        public IEnumerable<ApiFilter> ConvertToApiEntitiesCollection(IEnumerable<Filter> dataEntities)
        {
            var result = new List<ApiFilter>();
            foreach (var item in dataEntities)
            {
                result.Add(ConvertToApiEntity(item));
            }

            return result;
        }

        public ApiFilter ConvertToApiEntity(Filter dataEntity)
        {
            var user = _userMapper.ConvertToApiEntity(dataEntity.User);
            var result = new ApiFilter(dataEntity.Id, user, dataEntity.Name, dataEntity.Query);
            result.IsDirty = dataEntity.IsDirty;
            result.IsMarkForDeletion = dataEntity.IsMarkForDeletion;
            return result;
        }
    }
}
