using DataBaseWithBusinessLogicConnector.ApiEntities;
using DataBaseWithBusinessLogicConnector.DalEntities;
using DataBaseWithBusinessLogicConnector.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.DalApiMappers
{
    public class SchematicMapper
    {
        private ApiUser _user;
        private List<ApiSchematicType> _types;

        public void Update(ApiUser user, List<ApiSchematicType> types)
        {
            _user = user;
            _types = types;
        }

        public IEnumerable<ApiSchematic> ConvertToApiEntitiesCollection(IEnumerable<DalSchematic> dataEntities)
        {
            var result = new List<ApiSchematic>();

            foreach (var item in dataEntities)
            {
                result.Add(ConvertToApiEntity(item));
            }

            return result;
        }

        public ApiSchematic ConvertToApiEntity(DalSchematic dataEntity)
        {
            var context = Newtonsoft.Json.JsonConvert.DeserializeObject<SchematicContext>(dataEntity.Json);
            var type = _types.Where(t => t.Id == dataEntity.TypeId).First();
            var result = new ApiSchematic(dataEntity.Id, type, context, _user);
            result.IsDirty = dataEntity.IsDirty;
            result.IsMarkForDeletion = dataEntity.IsMarkForDeletion;
            return result;
        }

        public IEnumerable<DalSchematic> ConvertToDALEntitiesCollection(IEnumerable<ApiSchematic> dataEntities)
        {
            var result = new List<DalSchematic>();

            foreach (var item in dataEntities)
            {
                result.Add(ConvertToDALEntity(item));
            }

            return result;
        }

        public DalSchematic ConvertToDALEntity(ApiSchematic businessEntity)
        {
            var json = Newtonsoft.Json.JsonConvert.SerializeObject(businessEntity.Context).Replace("\\","\\\\");
            var result = new DalSchematic(businessEntity.Id, businessEntity.Type.Id, json, businessEntity.User.Id);
            result.IsDirty = businessEntity.IsDirty;
            result.IsMarkForDeletion = businessEntity.IsMarkForDeletion;

            return result;
        }
    }
}
