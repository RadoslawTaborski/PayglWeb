using DataBaseWithBusinessLogicConnector.ApiEntities;
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
        private List<ApiTransactionType> _transactionTypes;
        private List<ApiOperation> _operations;
        private ApiUser _user;
        private OperationMapper _operationMapper;
        private List<DalOperationsGroupTags> _dalRelations;

        private RelationTagMapper _tagMapper = new RelationTagMapper();

        public void Update(OperationMapper operationMapper, List<ApiImportance> importances, List<ApiTag> tags, List<ApiFrequency> frequencies, List<ApiOperation> operations, ApiUser user, List<DalOperationsGroupTags> relations, List<ApiTransactionType> transactionTypes)
        {
            _importances = importances;
            _frequencies = frequencies;
            _transactionTypes = transactionTypes;
            _tagMapper.Update(tags);
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

            var dalTags = _dalRelations.Where(t => t.OperationsGroupId == dataEntity.Id);
            var tags = _tagMapper.ConvertToApiEntitiesCollection(dalTags).ToArray();

            var result = new ApiOperationsGroup(dataEntity.Id, _user, dataEntity.Description, frequency, importance, dataEntity.Date, tags, operations);
            result.UpdateAmount(_transactionTypes);
            result.IsDirty = dataEntity.IsDirty;
            result.IsMarkForDeletion = dataEntity.IsMarkForDeletion;
            return result;
        }

        public IEnumerable<OperationsGroupComplex> ConvertToDALEntitiesCollection(IEnumerable<ApiOperationsGroup> dataEntities)
        {
            var result = new List<OperationsGroupComplex>();

            foreach (var item in dataEntities)
            {
                result.Add(ConvertToDALEntity(item));
            }

            return result;
        }

        public OperationsGroupComplex ConvertToDALEntity(ApiOperationsGroup businessEntity)
        {
            if (businessEntity?.User == null || businessEntity.Frequency == null || businessEntity.Importance == null)
            {
                throw new ArgumentException(Properties.strings.ExWrongParameters);
            }
            var result1 = new DalOperationsGroup(businessEntity.Id, businessEntity.User.Id, businessEntity.Description, businessEntity.Frequency.Id, businessEntity.Importance.Id, businessEntity.Date);
            result1.IsDirty = businessEntity.IsDirty;
            result1.IsMarkForDeletion = businessEntity.IsMarkForDeletion;

            var result2 = new List<DalOperationsGroupTags>();
            foreach (var tag in businessEntity.Tags)
            {
                var newTag = new DalOperationsGroupTags(tag.Id, businessEntity.Id, tag.Tag.Id);
                newTag.IsDirty = tag.IsDirty;
                newTag.IsMarkForDeletion = tag.IsMarkForDeletion;
                result2.Add(newTag);
            }

            var tmp = _operationMapper.ConvertToDALEntitiesCollection(businessEntity.Operations);

            return new OperationsGroupComplex(result1, result2, tmp);
        }
    }
}
