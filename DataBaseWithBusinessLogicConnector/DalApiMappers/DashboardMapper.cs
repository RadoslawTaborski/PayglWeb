using DataBaseWithBusinessLogicConnector.ApiEntities;
using DataBaseWithBusinessLogicConnector.DalEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.DalApiMappers
{
    public class DashboardMapper
    {
        private DashboardFilterMapper _relationMapper = new DashboardFilterMapper();
        private ApiUser _user;

        public void Update(ApiUser user)
        {
            _user = user;
        }

        public IEnumerable<ApiDashboard> ConvertToApiEntitiesCollection(IEnumerable<DalDashboard> dataEntities)
        {
            var result = new List<ApiDashboard>();

            foreach (var item in dataEntities)
            {
                result.Add(ConvertToApiEntity(item));
            }


            return result;
        }

        public ApiDashboard ConvertToApiEntity(DalDashboard dataEntity)
        {
            var result = new ApiDashboard(dataEntity.Id, _user, dataEntity.Name, dataEntity.IsVisible, dataEntity.Order);
            result.IsDirty = dataEntity.IsDirty;
            result.IsMarkForDeletion = dataEntity.IsMarkForDeletion;
            return result;
        }

        public IEnumerable<DashboardComplex> ConvertToDALEntitiesCollection(IEnumerable<ApiDashboard> dataEntities)
        {
            var result = new List<DashboardComplex>();

            foreach (var item in dataEntities)
            {
                result.Add(ConvertToDALEntity(item));
            }

            return result;
        }

        public DashboardComplex ConvertToDALEntity(ApiDashboard businessEntity)
        {
            var result1 = new DalDashboard(businessEntity.Id, businessEntity.User.Id, businessEntity.Name, businessEntity.IsVisible, businessEntity.Order);
            result1.IsDirty = businessEntity.IsDirty;
            result1.IsMarkForDeletion = businessEntity.IsMarkForDeletion;

            var result2 = new List<DalDashboardFilterRelation>();
            for (int i = 0; i < businessEntity.Relations.Count; i++)
            {
                ApiDashboardFilterRelation relation = businessEntity.Relations[i];
                if (relation.Filter != null && relation.Filter is ApiFilter) {
                    var tmp = new DalDashboardFilterRelation(relation.Id, businessEntity.Id, (relation.Filter as ApiFilter).Id, null, relation.IsVisible, relation.Order);
                    tmp.IsDirty = relation.IsDirty;
                    tmp.IsMarkForDeletion = relation.IsMarkForDeletion;
                    result2.Add(tmp);
                }
                if (relation.Filter != null && relation.Filter is ApiDashboard)
                {
                    var tmp = new DalDashboardFilterRelation(relation.Id, businessEntity.Id, null, (relation.Filter as ApiDashboard).Id, relation.IsVisible, relation.Order);
                    tmp.IsDirty = relation.IsDirty;
                    tmp.IsMarkForDeletion = relation.IsMarkForDeletion;
                    result2.Add(tmp);
                }
            }

            return new DashboardComplex(result1, result2);
        }
    }
}
