using DataBaseWithBusinessLogicConnector.ApiEntities;
using DataBaseWithBusinessLogicConnector.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.ApiEntityMappers
{
    public class TagMapper
    {
        public IEnumerable<Tag> ConvertToEntitiesCollection(IEnumerable<ApiTag> dataEntities)
        {
            var result = new List<Tag>();
            foreach (var item in dataEntities)
            {
                result.Add(ConvertToEntity(item));
            }

            return result;
        }

        public Tag ConvertToEntity(ApiTag dataEntity)
        {
            var result = new Tag(dataEntity.Id, dataEntity.Text);
            result.IsDirty = dataEntity.IsDirty;
            result.IsMarkForDeletion = dataEntity.IsMarkForDeletion;
            return result;
        }

        public IEnumerable<ApiTag> ConvertToApiEntitiesCollection(IEnumerable<Tag> dataEntities)
        {
            var result = new List<ApiTag>();
            foreach (var item in dataEntities)
            {
                result.Add(ConvertToApiEntity(item));
            }

            return result;
        }

        public ApiTag ConvertToApiEntity(Tag dataEntity)
        {
            var result = new ApiTag(dataEntity.Id, dataEntity.Text);
            result.IsDirty = dataEntity.IsDirty;
            result.IsMarkForDeletion = dataEntity.IsMarkForDeletion;
            return result;
        }
    }
}
