using DataAccess;
using DataBaseWithBusinessLogicConnector;
using DataBaseWithBusinessLogicConnector.Dal.Adapters;
using DataBaseWithBusinessLogicConnector.Dal.DalEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayglService
{
    public class Repository : IRepository
    {
        private static DatabaseManager DbManager { get; set; }
        private static DbConnector DbConnector { get; set; }
        public Repository()
        {
            ConfigurationManager.ReadConfig();
            var dataBaseData = ConfigurationManager.DataBaseData();
            DbManager = new DatabaseManager(new MySqlConnectionFactory(), dataBaseData.Address, dataBaseData.Port, dataBaseData.Table, dataBaseData.Login, dataBaseData.Password);
            DbConnector = new DbConnector(DbManager);
        }

        public IEnumerable<DalLanguage> GetLanguages()
        {
            var languageAdapter = new LanguageAdapter(DbConnector);
            return languageAdapter.GetAll();
        }

        public IEnumerable<DalUser> GetUsers()
        {
            var userAdapter = new UserAdapter(DbConnector);
            return userAdapter.GetAll();
        }

        public IEnumerable<DalUserDetails> GetUsersDetails()
        {
            var userDetailsAdapter = new UserDetailsAdapter(DbConnector);
            return userDetailsAdapter.GetAll();
        }

        public IEnumerable<DalTransactionType> GetTransactionTypes()
        {
            var transactionTypeAdapter = new TransactionTypeAdapter(DbConnector);
            return transactionTypeAdapter.GetAll();
        }

        public IEnumerable<DalTransferType> GetTransferTypes()
        {
            var transferTypeAdapter = new TransferTypeAdapter(DbConnector);
            return transferTypeAdapter.GetAll();
        }

        public IEnumerable<DalFrequency> GetFrequencies()
        {
            var frequencyAdapter = new FrequencyAdapter(DbConnector);
            return frequencyAdapter.GetAll();
        }

        public IEnumerable<DalImportance> GetImportancies()
        {
            var importanceAdapter = new ImportanceAdapter(DbConnector);
            return importanceAdapter.GetAll();
        }

        public IEnumerable<DalTag> GetTags()
        {
            var tagAdapter = new TagAdapter(DbConnector);
            return tagAdapter.GetAll();
        }

        public IEnumerable<DalOperation> GetOperations()
        {
            var operationAdapter = new OperationAdapter(DbConnector);
            return operationAdapter.GetAll();
        }

        public IEnumerable<DalOperationDetails> GetOperationsDetails()
        {
            var operationDetailsAdapter = new OperationDetailsAdapter(DbConnector);
            return operationDetailsAdapter.GetAll();
        }

        public IEnumerable<DalOperationTags> GetOperationTags()
        {
            var operationTagRelationAdapter = new OperationTagAdapter(DbConnector);
            return operationTagRelationAdapter.GetAll();
        }

        public IEnumerable<DalOperationsGroup> GetDalOperationsGroups()
        {
            var operationsGroupAdapter = new OperationsGroupAdapter(DbConnector);
            return operationsGroupAdapter.GetAll();
        }

        public IEnumerable<DalOperationsGroupTag> GetOperationsGroupTags()
        {
            var operationsGroupRelationAdapter = new OperationsGroupTagAdapter(DbConnector);
            return operationsGroupRelationAdapter.GetAll();
        }
    }
}
