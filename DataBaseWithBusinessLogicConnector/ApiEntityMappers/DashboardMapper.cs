using DataBaseWithBusinessLogicConnector.ApiEntities;
using DataBaseWithBusinessLogicConnector.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.ApiEntityMappers
{
    public class DashboardMapper
    {
        private UserMapper _userMapper;

        public DashboardMapper(UserMapper userMapper)
        {
            _userMapper = userMapper;
        }

        public IEnumerable<Dashboard> ConvertToEntitiesCollection(IEnumerable<ApiDashboard> dataEntities)
        {
            var result = new List<Dashboard>();
            foreach (var item in dataEntities)
            {
                result.Add(ConvertToEntity(item));
            }

            return result;
        }

        public Dashboard ConvertToEntity(ApiDashboard dataEntity)
        {
            var user = _userMapper.ConvertToEntity(dataEntity.User);
            var result = new Dashboard(dataEntity.Id, user, dataEntity.Name, dataEntity.IsVisible);
            result.IsDirty = dataEntity.IsDirty;
            result.IsMarkForDeletion = dataEntity.IsMarkForDeletion;
            return result;
        }

        public IEnumerable<ApiDashboard> ConvertToApiEntitiesCollection(IEnumerable<Dashboard> dataEntities)
        {
            var result = new List<ApiDashboard>();
            foreach (var item in dataEntities)
            {
                result.Add(ConvertToApiEntity(item));
            }

            return result;
        }

        public ApiDashboard ConvertToApiEntity(Dashboard dataEntity)
        {
            var user = _userMapper.ConvertToApiEntity(dataEntity.User);
            var result = new ApiDashboard(dataEntity.Id, user, dataEntity.Name, dataEntity.IsVisible);
            result.IsDirty = dataEntity.IsDirty;
            result.IsMarkForDeletion = dataEntity.IsMarkForDeletion;
            return result;
        }
    }
}
