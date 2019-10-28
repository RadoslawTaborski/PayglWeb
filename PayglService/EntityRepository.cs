using DataBaseWithBusinessLogicConnector.ApiEntities;
using DataBaseWithBusinessLogicConnector.ApiEntityMappers;
using DataBaseWithBusinessLogicConnector.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayglService
{
    public class EntityRepository
    {
        #region Entities
        public static Language Language { get; private set; }
        public static List<Language> Languages { get; private set; }
        public static User User { get; private set; }
        public static List<Tag> Tags { get; private set; }
        public static List<Frequency> Frequencies { get; private set; }
        public static List<Importance> Importances { get; private set; }
        public static List<TransactionType> TransactionTypes { get; private set; }
        public static List<TransferType> TransferTypes { get; private set; }
        public static List<Operation> Operations { get; private set; }
        public static List<OperationsGroup> OperationsGroups { get; private set; }
        #endregion

        #region Mappers
        static OperationsGroupMapper _operationsGroupMapper;
        static OperationMapper _operationMapper;
        static OperationDetailsMapper _operationDetailsMapper;
        static UserMapper _userMapper;
        static UserDetailsMapper _userDetailsMapper;
        static LanguageMapper _languageMapper;
        static TagMapper _tagMapper;
        static RelationTagMapper _relationTagMapper;
        static FrequencyMapper _frequencyMapper;
        static ImportanceMapper _importanceMapper;
        static TransactionTypeMapper _transactionTypeMapper;
        static TransferTypeMapper _transferTypeMapper;
        #endregion

        public EntityRepository()
        {
            _userDetailsMapper = new UserDetailsMapper();
            _languageMapper = new LanguageMapper();
            _userMapper = new UserMapper(_languageMapper, _userDetailsMapper);
            _tagMapper = new TagMapper();
            _relationTagMapper = new RelationTagMapper(_tagMapper);
            _frequencyMapper = new FrequencyMapper();
            _importanceMapper = new ImportanceMapper();
            _transactionTypeMapper = new TransactionTypeMapper();
            _transferTypeMapper = new TransferTypeMapper();
            _operationDetailsMapper = new OperationDetailsMapper();
            _operationMapper = new OperationMapper(_userMapper, _frequencyMapper, _importanceMapper, _relationTagMapper, _transactionTypeMapper, _transferTypeMapper, _operationDetailsMapper);
            _operationsGroupMapper = new OperationsGroupMapper(_userMapper, _frequencyMapper, _importanceMapper, _relationTagMapper, _transactionTypeMapper, _transferTypeMapper, _operationMapper);
        }

        public IEnumerable<Operation> GetOperations(List<ApiOperation> apiOperations)
        {
            return _operationMapper.ConvertToEntitiesCollection(apiOperations);
        }

        public IEnumerable<ApiOperation> GetApiOperations(List<Operation> operations)
        {
            return _operationMapper.ConvertToApiEntitiesCollection(operations);
        }

        public IEnumerable<OperationsGroup> GetOperationsGroups(List<ApiOperationsGroup> apiOperationsGroups)
        {
            return _operationsGroupMapper.ConvertToEntitiesCollection(apiOperationsGroups);
        }

        public IEnumerable<ApiOperationsGroup> GetApiOperationsGroups(List<OperationsGroup> operationsGroups)
        {
            return _operationsGroupMapper.ConvertToApiEntitiesCollection(operationsGroups);
        }

        public IEnumerable<TransactionType> GetTransactionTypes(List<ApiTransactionType> apiTransactionTypes)
        {
            return _transactionTypeMapper.ConvertToEntitiesCollection(apiTransactionTypes);
        }
    }
}
