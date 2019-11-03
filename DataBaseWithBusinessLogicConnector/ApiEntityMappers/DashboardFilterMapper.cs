using DataBaseWithBusinessLogicConnector.ApiEntities;
using DataBaseWithBusinessLogicConnector.Entities;
using DataBaseWithBusinessLogicConnector.Interfaces;
using DataBaseWithBusinessLogicConnector.Interfaces.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.ApiEntityMappers
{
    public class DashboardFilterMapper
    {
        private DashboardMapper _dashboardMapper;
        private FilterMapper _filterMapper;
        public DashboardFilterMapper(FilterMapper filterMapper, DashboardMapper dashboardMapper)
        {
            _filterMapper = filterMapper;
            _dashboardMapper = dashboardMapper;
        }

        public IEnumerable<DashboardFilterRelation> ConvertToEntitiesCollection(IEnumerable<ApiDashboardFilterRelation> dataEntities)
        {
            var result = new List<DashboardFilterRelation>();
            foreach (var item in dataEntities)
            {
                result.Add(ConvertToEntity(item));
            }

            return result;
        }

        public DashboardFilterRelation ConvertToEntity(ApiDashboardFilterRelation dataEntity)
        {
            IFilter filter = null;
            if(dataEntity.Filter is ApiFilter)
            {
                filter = _filterMapper.ConvertToEntity(dataEntity.Filter as ApiFilter);
            } else if(dataEntity.Filter is ApiDashboard)
            {
                filter = _dashboardMapper.ConvertToEntity(dataEntity.Filter as ApiDashboard);
            }
            var result = new DashboardFilterRelation(dataEntity.Id, filter, dataEntity.IsVisible, dataEntity.IndexOfNext);
            result.IsDirty = dataEntity.IsDirty;
            result.IsMarkForDeletion = dataEntity.IsMarkForDeletion;
            return result;
        }

        public IEnumerable<ApiDashboardFilterRelation> ConvertToApiEntitiesCollection(IEnumerable<DashboardFilterRelation> dataEntities)
        {
            var result = new List<ApiDashboardFilterRelation>();
            foreach (var item in dataEntities)
            {
                result.Add(ConvertToApiEntity(item));
            }

            return result;
        }

        public ApiDashboardFilterRelation ConvertToApiEntity(DashboardFilterRelation dataEntity)
        {
            IApiFilter filter = null;
            if (dataEntity.Filter is Filter)
            {
                filter = _filterMapper.ConvertToApiEntity(dataEntity.Filter as Filter);
            }
            else if (dataEntity.Filter is Dashboard)
            {
                filter = _dashboardMapper.ConvertToApiEntity(dataEntity.Filter as Dashboard);
            }
            var result = new ApiDashboardFilterRelation(dataEntity.Id, filter, dataEntity.IsVisible, dataEntity.IndexOfNext);
            result.IsDirty = dataEntity.IsDirty;
            result.IsMarkForDeletion = dataEntity.IsMarkForDeletion;
            return result;
        }
    }
}
