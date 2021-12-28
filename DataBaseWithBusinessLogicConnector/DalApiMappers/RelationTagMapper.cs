using DataBaseWithBusinessLogicConnector.ApiEntities;
using DataBaseWithBusinessLogicConnector.DalEntities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace DataBaseWithBusinessLogicConnector.DalApiMappers
{
    public class RelationTagMapper
    {
        private List<ApiTag> _tags;

        public void Update(List<ApiTag> tags)
        {
            _tags = tags;
        }

        public IEnumerable<ApiRelTag> ConvertToApiEntitiesCollection(IEnumerable<DalOperationTags> dataEntities)
        {
            var result = new List<ApiRelTag>();

            foreach (var item in dataEntities)
            {
                result.Add(ConvertToApiEntity(item));
            }

            return result;
        }

        public ApiRelTag ConvertToApiEntity(DalOperationTags dataEntity)
        {
            var tag = _tags.Where(t=>t.Id == dataEntity.TagId).FirstOrDefault();
            var result = new ApiRelTag(dataEntity.Id, tag);
            result.IsDirty = dataEntity.IsDirty;
            result.IsMarkForDeletion = dataEntity.IsMarkForDeletion;
            return result;
        }

        public IEnumerable<DalOperationTags> ConvertToDALOperationEntitiesCollection(IEnumerable<ApiRelTag> dataEntities, int operationId)
        {
            var result = new List<DalOperationTags>();

            foreach (var item in dataEntities)
            {
                result.Add(ConvertToDALOperationEntity(item, operationId));
            }

            return result;
        }

        public DalOperationTags ConvertToDALOperationEntity(ApiRelTag businessEntity, int operationId)
        {
            if (businessEntity?.Tag == null)
            {
                throw new ArgumentException(Properties.strings.ExWrongParameters);
            }
            var result = new DalOperationTags(businessEntity.Id, operationId, businessEntity.Tag.Id);
            result.IsDirty = businessEntity.IsDirty;
            result.IsMarkForDeletion = businessEntity.IsMarkForDeletion;

            return result;
        }

        public IEnumerable<ApiRelTag> ConvertToApiEntitiesCollection(IEnumerable<DalOperationsGroupTags> dataEntities)
        {
            var result = new List<ApiRelTag>();

            foreach (var item in dataEntities)
            {
                result.Add(ConvertToApiEntity(item));
            }

            return result;
        }

        public ApiRelTag ConvertToApiEntity(DalOperationsGroupTags dataEntity)
        {
            var tag = _tags.Where(t => t.Id == dataEntity.TagId).FirstOrDefault();
            var result = new ApiRelTag(dataEntity.Id, tag); 
            result.IsDirty = dataEntity.IsDirty;
            result.IsMarkForDeletion = dataEntity.IsMarkForDeletion;
            return result;
        }

        public IEnumerable<DalOperationsGroupTags> ConvertToDALOperationsGroupEntitiesCollection(IEnumerable<ApiRelTag> dataEntities, int operationId)
        {
            var result = new List<DalOperationsGroupTags>();

            foreach (var item in dataEntities)
            {
                result.Add(ConvertToDALOperationsGroupEntity(item, operationId));
            }

            return result;
        }

        public DalOperationsGroupTags ConvertToDALOperationsGroupEntity(ApiRelTag businessEntity, int operationId)
        {
            if (businessEntity?.Tag == null)
            {
                throw new ArgumentException(Properties.strings.ExWrongParameters);
            }
            var result = new DalOperationsGroupTags(businessEntity.Id, operationId, businessEntity.Tag.Id);
            result.IsDirty = businessEntity.IsDirty;
            result.IsMarkForDeletion = businessEntity.IsMarkForDeletion;

            return result;
        }
    }
}
