using DataBaseWithBusinessLogicConnector.ApiEntities;
using DataBaseWithBusinessLogicConnector.DalEntities;
using DataBaseWithBusinessLogicConnector.Interfaces;
using DataBaseWithBusinessLogicConnector.Interfaces.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.DalApiMappers
{
    public class DashboardFilterMapper
    {
        private List<ApiFilter> _filters;
        private List<ApiDashboard> _dashboards;

        public void Update(List<ApiFilter> filters, List<ApiDashboard> dashboards)
        {
            _filters = filters;
            _dashboards = dashboards;
        }

        public IEnumerable<ApiDashboardFilterRelation> ConvertToApiEntitiesCollection(IEnumerable<DalDashboardFilterRelation> dataEntities)
        {
            var result = new List<ApiDashboardFilterRelation>();

            foreach (var item in dataEntities)
            {
                result.Add(ConvertToApiEntity(item));
            }

            return result;
        }

        public ApiDashboardFilterRelation ConvertToApiEntity(DalDashboardFilterRelation dataEntity)
        {
            IApiFilter filter = null;
            if (dataEntity.FilterTargetId != null)
            {
                filter = _filters.Where(t => t.Id == dataEntity.FilterTargetId).FirstOrDefault();
            } else
            {
                filter = _dashboards.Where(t => t.Id == dataEntity.DashboardTargetId).FirstOrDefault();
            }

            var result = new ApiDashboardFilterRelation(dataEntity.Id, filter, dataEntity.IsVisible, dataEntity.Order);
            result.IsDirty = dataEntity.IsDirty;
            result.IsMarkForDeletion = dataEntity.IsMarkForDeletion;
            return result;
        }

        public IEnumerable<DalDashboardFilterRelation> ConvertToDALEntitiesCollection(IEnumerable<ApiDashboardFilterRelation> dataEntities, ApiDashboard source)
        {
            var result = new List<DalDashboardFilterRelation>();

            for (var i =0; i< dataEntities.Count();++i)
            {
                var item = dataEntities.ElementAt(i);
                var next = (i+1)<dataEntities.Count()?dataEntities.ElementAt(i + 1):null;
                result.Add(ConvertToDALEntity(item, source, next));
            }

            return result;
        }

        public DalDashboardFilterRelation ConvertToDALEntity(ApiDashboardFilterRelation businessEntity, ApiDashboard source, ApiDashboardFilterRelation next)
        {
            int? filterId = null;
            int? dashboardId = null;
            if (businessEntity.Filter is ApiFilter)
            {
                filterId = (businessEntity.Filter as ApiFilter).Id;
            }
            else
            {
                dashboardId = (businessEntity.Filter as ApiDashboard).Id;
            }

            var result = new DalDashboardFilterRelation(businessEntity.Id, source.Id, filterId, dashboardId, businessEntity.IsVisible, businessEntity.Order);
            result.IsDirty = businessEntity.IsDirty;
            result.IsMarkForDeletion = businessEntity.IsMarkForDeletion;

            return result;

        }
    }
}
