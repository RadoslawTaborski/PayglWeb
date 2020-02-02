using DataBaseWithBusinessLogicConnector.ApiEntities;
using DataBaseWithBusinessLogicConnector.DalEntities;
using DataBaseWithBusinessLogicConnector.Helpers;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.DalApiMappers
{
    public class SettingsMapper
    {
        private ApiUser _user;

        public void Update(ApiUser user)
        {
            _user = user;
        }

        public IEnumerable<ApiSettings> ConvertToApiEntitiesCollection(IEnumerable<DalSettings> dataEntities)
        {
            var result = new List<ApiSettings>();

            foreach (var item in dataEntities)
            {
                result.Add(ConvertToApiEntity(item));
            }

            return result;
        }

        public ApiSettings ConvertToApiEntity(DalSettings dataEntity)
        {
            var context = Newtonsoft.Json.JsonConvert.DeserializeObject<SettingsContext>(dataEntity.Json);
            var result = new ApiSettings(dataEntity.Id, context, _user);
            result.IsDirty = dataEntity.IsDirty;
            result.IsMarkForDeletion = dataEntity.IsMarkForDeletion;
            return result;
        }

        public IEnumerable<DalSettings> ConvertToDALEntitiesCollection(IEnumerable<ApiSettings> dataEntities)
        {
            var result = new List<DalSettings>();

            foreach (var item in dataEntities)
            {
                result.Add(ConvertToDALEntity(item));
            }

            return result;
        }

        public DalSettings ConvertToDALEntity(ApiSettings businessEntity)
        {
            var json = JsonHelper.JsonFromObject(businessEntity.Context);
            var result = new DalSettings(businessEntity.Id, json, businessEntity.User.Id);
            result.IsDirty = businessEntity.IsDirty;
            result.IsMarkForDeletion = businessEntity.IsMarkForDeletion;

            return result;
        }
    }
}
