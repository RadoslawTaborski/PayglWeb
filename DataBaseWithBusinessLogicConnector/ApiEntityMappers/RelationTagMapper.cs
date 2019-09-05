using DataBaseWithBusinessLogicConnector.ApiEntities;
using DataBaseWithBusinessLogicConnector.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataBaseWithBusinessLogicConnector.ApiEntityMappers
{
    public class RelationTagMapper
    {
        private TagMapper _tagMapper;

        public RelationTagMapper(TagMapper tagMapper)
        {
            _tagMapper = tagMapper;
        }

        public IEnumerable<RelTag> ConvertToEntitiesCollection(IEnumerable<ApiRelTag> dataEntities)
        {
            var result = new List<RelTag>();
            foreach (var item in dataEntities)
            {
                result.Add(ConvertToEntity(item));
            }

            return result;
        }

        public RelTag ConvertToEntity(ApiRelTag dataEntity)
        {
            var tag = _tagMapper.ConvertToEntity(dataEntity.Tag);

            var result = new RelTag(dataEntity.Id, tag);
            result.IsDirty = dataEntity.IsDirty;
            return result;
        }

        public IEnumerable<ApiRelTag> ConvertToApiEntitiesCollection(IEnumerable<RelTag> dataEntities)
        {
            var result = new List<ApiRelTag>();
            foreach (var item in dataEntities)
            {
                result.Add(ConvertToApiEntity(item));
            }

            return result;
        }

        public ApiRelTag ConvertToApiEntity(RelTag dataEntity)
        {
            var tag = _tagMapper.ConvertToApiEntity(dataEntity.Tag);

            var result = new ApiRelTag(dataEntity.Id, tag);
            result.IsDirty = dataEntity.IsDirty;
            return result;
        }
    }
}
