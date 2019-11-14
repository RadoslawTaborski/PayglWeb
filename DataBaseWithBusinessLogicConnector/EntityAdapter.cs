using DataBaseWithBusinessLogicConnector.ApiEntities;
using DataBaseWithBusinessLogicConnector.ApiEntityMappers;
using DataBaseWithBusinessLogicConnector.Entities;
using DataBaseWithBusinessLogicConnector.Interfaces;
using DataBaseWithBusinessLogicConnector.Interfaces.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector
{
    public class EntityAdapter
    {
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
        static FilterMapper _filterMapper;
        static DashboardMapper _dashboardMapper;
        static DashboardFilterMapper _dashboardFilterMapper;
        #endregion

        public EntityAdapter()
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
            _dashboardMapper = new DashboardMapper(_userMapper);
            _filterMapper = new FilterMapper(_userMapper);
            _dashboardFilterMapper = new DashboardFilterMapper(_filterMapper,_dashboardMapper);
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

        public Dashboard GetDashboard(ApiDashboard apiDashboard)
        {
            var dasboard = _dashboardMapper.ConvertToEntity(apiDashboard);
            var relations = _dashboardFilterMapper.ConvertToEntitiesCollection(apiDashboard.Relations).ToList();

            dasboard.UpdateRelations(relations);
            return dasboard;
        }

        public IEnumerable<IApiOperation> GetIApiOperations(List<IOperation> iOperations)
        {
            var result = new List<IApiOperation>();
            var operations = iOperations.Where(o => o is Operation).Select(o=>o as Operation).ToList();
            var operationsGroups = iOperations.Where(o => o is OperationsGroup).Select(o => o as OperationsGroup).ToList();

            result.AddRange(GetApiOperations(operations));
            result.AddRange(GetApiOperationsGroups(operationsGroups));

            return result;
        }
    }
}
