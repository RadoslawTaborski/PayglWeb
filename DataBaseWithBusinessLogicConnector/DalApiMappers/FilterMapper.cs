using DataBaseWithBusinessLogicConnector.ApiEntities;
using DataBaseWithBusinessLogicConnector.DalEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.DalApiMappers
{
    public class FilterMapper
    {
        private ApiUser _user;

        public void Update(ApiUser user)
        {
            _user = user;
        }

        public IEnumerable<ApiFilter> ConvertToApiEntitiesCollection(IEnumerable<DalFilter> dataEntities)
        {
            var result = new List<ApiFilter>();

            foreach (var item in dataEntities)
            {
                result.Add(ConvertToApiEntity(item));
            }

            return result;
        }

        public ApiFilter ConvertToApiEntity(DalFilter dataEntity)
        {
            var result = new ApiFilter(dataEntity.Id, _user, dataEntity.Name, dataEntity.Query);
            result.IsDirty = dataEntity.IsDirty;
            result.IsMarkForDeletion = dataEntity.IsMarkForDeletion;
            return result;
        }

        public IEnumerable<DalFilter> ConvertToDALEntitiesCollection(IEnumerable<ApiFilter> dataEntities)
        {
            var result = new List<DalFilter>();

            foreach (var item in dataEntities)
            {
                result.Add(ConvertToDALEntity(item));
            }

            return result;
        }

        public DalFilter ConvertToDALEntity(ApiFilter businessEntity)
        {
            var result = new DalFilter(businessEntity.Id, businessEntity.User.Id, businessEntity.Name, businessEntity.Query);
            result.IsDirty = businessEntity.IsDirty;
            result.IsMarkForDeletion = businessEntity.IsMarkForDeletion;

            return result;
        }
    }
}
