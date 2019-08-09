using DataBaseWithBusinessLogicConnector.ApiEntities;
using DataBaseWithBusinessLogicConnector.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.ApiEntityMappers
{
    public class OperationsGroupMapper
    {
        private UserMapper _userMapper;
        private FrequenceMapper _frequencyMapper;
        private ImportanceMapper _importanceMapper;
        private TagMapper _tagMapper;
        private TransactionTypeMapper _transactionTypeMapper;
        private TransferTypeMapper _transferTypeMapper;
        private OperationMapper _operationMapper;

        public OperationsGroupMapper(UserMapper userMapper, FrequenceMapper frequencyMapper, ImportanceMapper importanceMapper, TagMapper tagMapper, TransactionTypeMapper transactionTypeMapper, TransferTypeMapper transferTypeMapper, OperationMapper operationMapper)
        {
            _userMapper = userMapper;
            _frequencyMapper = frequencyMapper;
            _importanceMapper = importanceMapper;
            _tagMapper = tagMapper;
            _transactionTypeMapper = transactionTypeMapper;
            _transferTypeMapper = transferTypeMapper;
            _operationMapper = operationMapper;
        }

        public IEnumerable<OperationsGroup> ConvertToEntitiesCollection(IEnumerable<ApiOperationsGroup> dataEntities)
        {
            var result = new List<OperationsGroup>();
            foreach (var item in dataEntities)
            {
                result.Add(ConvertToEntity(item));
            }

            return result;
        }

        public OperationsGroup ConvertToEntity(ApiOperationsGroup dataEntity)
        {
            var frequency = _frequencyMapper.ConvertToEntity(dataEntity.Frequency);
            var importance = _importanceMapper.ConvertToEntity(dataEntity.Importance);
            var operations = _operationMapper.ConvertToEntitiesCollection(dataEntity.Operations).ToList();
            var tags = _tagMapper.ConvertToEntitiesCollection(dataEntity.Tags).ToList();
            var user = _userMapper.ConvertToEntity(dataEntity.User);
            DateTime.TryParse(dataEntity.Date, out DateTime date);
            var result = new OperationsGroup(dataEntity.Id, user, dataEntity.Description, frequency, importance, date,tags,operations);
            return result;
        }

        public IEnumerable<ApiOperationsGroup> ConvertToApiEntitiesCollection(IEnumerable<OperationsGroup> dataEntities)
        {
            var result = new List<ApiOperationsGroup>();
            foreach (var item in dataEntities)
            {
                result.Add(ConvertToApiEntity(item));
            }

            return result;
        }

        public ApiOperationsGroup ConvertToApiEntity(OperationsGroup dataEntity)
        {
            var frequency = _frequencyMapper.ConvertToApiEntity(dataEntity.Frequency);
            var importance = _importanceMapper.ConvertToApiEntity(dataEntity.Importance);
            var user = _userMapper.ConvertToApiEntity(dataEntity.User);
            var tags = _tagMapper.ConvertToApiEntitiesCollection(dataEntity.Tags).ToArray();
            var operations = _operationMapper.ConvertToApiEntitiesCollection(dataEntity.Operations).ToArray();
            var result = new ApiOperationsGroup(dataEntity.Id, user, dataEntity.Description, frequency, importance, dataEntity.Date.ToString("yyyy-MM-dd"),tags,operations);
            return result;
        }
    }
}
