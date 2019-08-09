﻿using DataBaseWithBusinessLogicConnector.ApiEntities;
using DataBaseWithBusinessLogicConnector.DalEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.DalApiMappers
{
    public class OperationsGroupMapper
    {
        private List<ApiImportance> _importances;
        private List<ApiFrequency> _frequencies;
        private List<ApiTag> _tags;
        private List<ApiOperation> _operations;
        private ApiUser _user;
        private OperationMapper _operationMapper;
        private List<DalOperationsGroupTag> _dalRelations;

        public void Update(OperationMapper operationMapper, List<ApiImportance> importances, List<ApiTag> tags, List<ApiFrequency> frequencies, List<ApiOperation> operations, ApiUser user, List<DalOperationsGroupTag> relations)
        {
            _importances = importances;
            _frequencies = frequencies;
            _tags = tags;
            _dalRelations = relations;
            _operations = operations;
            _operationMapper = operationMapper;
            _user = user;
        }

        public IEnumerable<ApiOperationsGroup> ConvertToApiEntitiesCollection(IEnumerable<DalOperationsGroup> dataEntities)
        {
            var result = new List<ApiOperationsGroup>();

            foreach (var item in dataEntities)
            {
                result.Add(ConvertToApiEntity(item));
            }

            return result;
        }

        public ApiOperationsGroup ConvertToApiEntity(DalOperationsGroup dataEntity)
        {
            var frequency = _frequencies.First(f => f.Id == dataEntity.FrequencyId);
            var importance = _importances.First(f => f.Id == dataEntity.ImportanceId);
            var operations = _operations.Where(o => o.GroupId == dataEntity.Id).ToArray();

            var tagsid = _dalRelations.Where(t => t.OperationsGroupId == dataEntity.Id).Select(t => t.TagId);
            var tags = _tags.Where(t => tagsid.Contains(t.Id)).ToArray();

            var result = new ApiOperationsGroup(dataEntity.Id, _user, dataEntity.Description, frequency, importance, dataEntity.Date, tags, operations); 
            return result;
        }

        public (IEnumerable<DalOperationsGroup>, IEnumerable<DalOperationsGroupTag>, IEnumerable<DalOperation>, IEnumerable<DalOperationTags>, IEnumerable<DalOperationDetails>) ConvertToDALEntitiesCollection(IEnumerable<ApiOperationsGroup> dataEntities)
        {
            var result1 = new List<DalOperationsGroup>();
            var result2 = new List<DalOperationsGroupTag>();
            var result3 = new List<DalOperation>();
            var result4 = new List<DalOperationTags>();
            var result5 = new List<DalOperationDetails>();


            foreach (var item in dataEntities)
            {
                var res = ConvertToDALEntity(item);
                result1.Add(res.Item1);
                result2.AddRange(res.Item2);
                result3.AddRange(res.Item3);
                result4.AddRange(res.Item4);
                result5.AddRange(res.Item5);
            }

            return (result1, result2, result3, result4, result5);
        }

        public (DalOperationsGroup, IEnumerable<DalOperationsGroupTag>, IEnumerable<DalOperation>, IEnumerable<DalOperationTags>, IEnumerable<DalOperationDetails>) ConvertToDALEntity(ApiOperationsGroup businessEntity)
        {
            if (businessEntity?.User == null || businessEntity.Frequency == null || businessEntity.Importance == null)
            {
                throw new ArgumentException(Properties.strings.ExWrongParameters);
            }
            var result1 = new DalOperationsGroup(businessEntity.Id, businessEntity.User.Id, businessEntity.Description, businessEntity.Frequency.Id, businessEntity.Importance.Id, businessEntity.Date);

            var result2 = new List<DalOperationsGroupTag>();
            foreach (var tag in businessEntity.Tags)
            {
                result2.Add(new DalOperationsGroupTag(null, businessEntity.Id, tag.Id));
            }

            var tmp = _operationMapper.ConvertToDALEntitiesCollection(businessEntity.Operations);

            return (result1, result2, tmp.Item1, tmp.Item2, tmp.Item3);
        }
    }
}