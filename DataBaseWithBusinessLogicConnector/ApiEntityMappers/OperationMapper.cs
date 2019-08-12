using DataBaseWithBusinessLogicConnector.ApiEntities;
using DataBaseWithBusinessLogicConnector.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.ApiEntityMappers
{
    public class OperationMapper
    {
        private UserMapper _userMapper;
        private FrequencyMapper _frequencyMapper;
        private ImportanceMapper _importanceMapper;
        private TagMapper _tagMapper;
        private TransactionTypeMapper _transactionTypeMapper;
        private TransferTypeMapper _transferTypeMapper;
        private OperationDetailsMapper _detailsMapper;

        public OperationMapper(UserMapper userMapper, FrequencyMapper frequencyMapper, ImportanceMapper importanceMapper, TagMapper tagMapper, TransactionTypeMapper transactionTypeMapper, TransferTypeMapper transferTypeMapper, OperationDetailsMapper detailsMapper)
        {
            _userMapper = userMapper;
            _frequencyMapper = frequencyMapper;
            _importanceMapper = importanceMapper;
            _tagMapper = tagMapper;
            _transactionTypeMapper = transactionTypeMapper;
            _transferTypeMapper = transferTypeMapper;
            _detailsMapper = detailsMapper;
        }

        public IEnumerable<Operation> ConvertToEntitiesCollection(IEnumerable<ApiOperation> dataEntities)
        {
            var result = new List<Operation>();
            foreach (var item in dataEntities)
            {
                result.Add(ConvertToEntity(item));
            }

            return result;
        }

        public Operation ConvertToEntity(ApiOperation dataEntity)
        {
            var user = _userMapper.ConvertToEntity(dataEntity.User);
            var frequency = _frequencyMapper.ConvertToEntity(dataEntity.Frequency);
            var importance = _importanceMapper.ConvertToEntity(dataEntity.Importance);
            var transferType = _transferTypeMapper.ConvertToEntity(dataEntity.TransferType);
            var transactionType = _transactionTypeMapper.ConvertToEntity(dataEntity.TransactionType);
            var tags = _tagMapper.ConvertToEntitiesCollection(dataEntity.Tags);
            var details = _detailsMapper.ConvertToEntitiesCollection(dataEntity.DetailsList);
            DateTime.TryParse(dataEntity.Date, out DateTime date);
            var result = new Operation(dataEntity.Id, null, user,dataEntity.Description,dataEntity.Amount,transactionType,transferType,frequency,importance,date,dataEntity.ReceiptPath,tags.ToList(), details.ToList());

            return result;
        }

        public IEnumerable<ApiOperation> ConvertToApiEntitiesCollection(IEnumerable<Operation> dataEntities)
        {
            var result = new List<ApiOperation>();
            foreach (var item in dataEntities)
            {
                result.Add(ConvertToApiEntity(item));
            }

            return result;
        }

        public ApiOperation ConvertToApiEntity(Operation dataEntity)
        {
            var user = _userMapper.ConvertToApiEntity(dataEntity.User);
            var frequency = _frequencyMapper.ConvertToApiEntity(dataEntity.Frequency);
            var importance = _importanceMapper.ConvertToApiEntity(dataEntity.Importance);
            var transferType = _transferTypeMapper.ConvertToApiEntity(dataEntity.TransferType);
            var transactionType = _transactionTypeMapper.ConvertToApiEntity(dataEntity.TransactionType);
            var tags = _tagMapper.ConvertToApiEntitiesCollection(dataEntity.Tags).ToArray();
            var details = _detailsMapper.ConvertToApiEntitiesCollection(dataEntity.DetailsList).ToArray();
            var result = new ApiOperation(dataEntity.Id, dataEntity.Parent.Id, user, dataEntity.Amount, transactionType, transferType,frequency, importance, dataEntity.Date.ToString("yyyy-MM-dd"),dataEntity.ReceiptPath, tags, details, dataEntity.Description);
            return result;
        }
    }
}
