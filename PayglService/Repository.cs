using DataAccess;
using DataAccess.Interfaces;
using DataBaseWithBusinessLogicConnector;
using DataBaseWithBusinessLogicConnector.DbAdapters;
using DataBaseWithBusinessLogicConnector.DalEntities;
using DataBaseWithBusinessLogicConnector.DalEntityMappers;
using DataBaseWithBusinessLogicConnector.DalApiMappers;
using DataBaseWithBusinessLogicConnector.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataBaseWithBusinessLogicConnector.ApiEntities;

namespace PayglService
{
    public class Repository : IRepository
    {
        private IDataAccess DbManager { get; set; }
        private DbConnector DbConnector { get; set; }

        #region Entities
        public ApiUser User { get; private set; }
        public ApiUserDetails UserDetails { get; private set; }
        public ApiLanguage Language { get; private set; }
        public List<ApiLanguage> Languages { get; private set; }
        public List<ApiTransactionType> TransactionTypes { get; private set; }
        public List<ApiTransferType> TransferTypes { get; private set; }
        public List<ApiFrequency> Frequencies { get; private set; }
        public List<ApiImportance> Importances { get; private set; }
        public List<ApiTag> Tags { get; private set; }
        public List<ApiOperation> Operations { get; private set; }
        public List<ApiOperationsGroup> OperationsGroups { get; private set; }
        #endregion

        #region DbAdapters
        private LanguageAdapter LanguageAdapter { get; }
        private UserAdapter UserAdapter { get; }
        private UserDetailsAdapter UserDetailsAdapter { get; }
        private TransactionTypeAdapter TransactionTypeAdapter { get; }
        private TransferTypeAdapter TransferTypeAdapter { get; }
        private FrequencyAdapter FrequencyAdapter { get; }
        private ImportanceAdapter ImportanceAdapter { get; }
        private TagAdapter TagAdapter { get; }
        private OperationAdapter OperationAdapter { get; }
        private OperationDetailsAdapter OperationDetailsAdapter { get; }
        private OperationTagAdapter OperationTagRelationAdapter { get; }
        private OperationsGroupAdapter OperationsGroupAdapter { get; }
        private OperationsGroupTagAdapter OperationsGroupRelationAdapter { get; }
        #endregion

        #region Mappers
        private DataBaseWithBusinessLogicConnector.DalApiMappers.LanguageMapper LanguageMapper { get; set; }
        private DataBaseWithBusinessLogicConnector.DalApiMappers.UserMapper UserMapper { get; set; }
        private DataBaseWithBusinessLogicConnector.DalApiMappers.UserDetailsMapper UserDetailsMapper { get; set; }
        private DataBaseWithBusinessLogicConnector.DalApiMappers.TransactionTypeMapper TransactionTypeMapper { get; set; }
        private DataBaseWithBusinessLogicConnector.DalApiMappers.TransferTypeMapper TransferTypeMapper { get; set; }
        private DataBaseWithBusinessLogicConnector.DalApiMappers.FrequencyMapper FrequencyMapper { get; set; }
        private DataBaseWithBusinessLogicConnector.DalApiMappers.ImportanceMapper ImportanceMapper { get; set; }
        private DataBaseWithBusinessLogicConnector.DalApiMappers.TagMapper TagMapper { get; set; }
        private DataBaseWithBusinessLogicConnector.DalApiMappers.OperationMapper OperationMapper { get; set; }
        private DataBaseWithBusinessLogicConnector.DalApiMappers.OperationsGroupMapper OperationsGroupMapper { get; set; }
        #endregion

        public Repository(IDataBaseManagerFactory dbEngine)
        {
            ConfigurationManager.ReadConfig();
            var dataBaseData = ConfigurationManager.DataBaseData();
            DbManager = new DatabaseManager(dbEngine, dataBaseData.Address, dataBaseData.Port, dataBaseData.Table, dataBaseData.Login, dataBaseData.Password);
            DbConnector = new DbConnector(DbManager);

            LanguageAdapter = new LanguageAdapter(DbConnector);
            UserAdapter = new UserAdapter(DbConnector);
            UserDetailsAdapter = new UserDetailsAdapter(DbConnector);
            TransactionTypeAdapter = new TransactionTypeAdapter(DbConnector);
            TransferTypeAdapter = new TransferTypeAdapter(DbConnector);
            FrequencyAdapter = new FrequencyAdapter(DbConnector);
            ImportanceAdapter = new ImportanceAdapter(DbConnector);
            TagAdapter = new TagAdapter(DbConnector);
            OperationAdapter = new OperationAdapter(DbConnector);
            OperationDetailsAdapter = new OperationDetailsAdapter(DbConnector);
            OperationTagRelationAdapter = new OperationTagAdapter(DbConnector);
            OperationsGroupAdapter = new OperationsGroupAdapter(DbConnector);
            OperationsGroupRelationAdapter = new OperationsGroupTagAdapter(DbConnector);

            LanguageMapper = new DataBaseWithBusinessLogicConnector.DalApiMappers.LanguageMapper();
            UserMapper = new DataBaseWithBusinessLogicConnector.DalApiMappers.UserMapper();
            UserDetailsMapper = new DataBaseWithBusinessLogicConnector.DalApiMappers.UserDetailsMapper();

            TransactionTypeMapper = new DataBaseWithBusinessLogicConnector.DalApiMappers.TransactionTypeMapper();
            TransferTypeMapper = new DataBaseWithBusinessLogicConnector.DalApiMappers.TransferTypeMapper();
            FrequencyMapper = new DataBaseWithBusinessLogicConnector.DalApiMappers.FrequencyMapper();
            ImportanceMapper = new DataBaseWithBusinessLogicConnector.DalApiMappers.ImportanceMapper();
            TagMapper = new DataBaseWithBusinessLogicConnector.DalApiMappers.TagMapper();
            OperationMapper = new DataBaseWithBusinessLogicConnector.DalApiMappers.OperationMapper();
            OperationsGroupMapper = new DataBaseWithBusinessLogicConnector.DalApiMappers.OperationsGroupMapper();

            LoadUserAndLanguage();
            LoadAttributes();
            LoadOperations();
            LoadOperationsGroups();
        }

        public IEnumerable<ApiTransactionType> GetTransactionTypes()
        {
            return TransactionTypes;
        }

        public IEnumerable<ApiTransferType> GetTransferTypes()
        {
            return TransferTypes;

        }

        public IEnumerable<ApiFrequency> GetFrequencies()
        {
            return Frequencies;
        }

        public IEnumerable<ApiImportance> GetImportances()
        {
            return Importances;
        }

        public IEnumerable<ApiTag> GetTags()
        {
            return Tags;
        }

        public IEnumerable<ApiOperation> GetOperations()
        {
            return Operations;
        }

        public IEnumerable<ApiOperationsGroup> GetOperationsGroups()
        {
            return OperationsGroups;
        }



        private void LoadUserAndLanguage()
        {
            Languages = LanguageMapper.ConvertToApiEntitiesCollection(LanguageAdapter.GetAll()).ToList();

            DalUser dalUser = null;
            var dalUsers = UserAdapter.GetAll($"login='rado'");
            var enumerable = dalUsers.ToList();
            if (enumerable.Count() == 0)
            {
                throw new NotImplementedException(); //TODO:
            }

            if (enumerable.ElementAt(0).Password == "1234")
            {
                dalUser = enumerable.ElementAt(0);
            }
            else
            {
                throw new NotImplementedException(); //TODO:
            }
            Language = Languages.Where(l => l.Id == dalUser.LanguageId).First();
            UserDetails = UserDetailsMapper.ConvertToApiEntity(UserDetailsAdapter.GetById(dalUser.DetailsId));
            UserMapper.Update(Language,UserDetails);

            User = UserMapper.ConvertToApiEntity(dalUser);          
        }

        private void LoadAttributes()
        {
            TransactionTypes = TransactionTypeMapper.ConvertToApiEntitiesCollection(TransactionTypeAdapter.GetAll($"language_id={Language.Id}")).ToList();
            TransferTypes = TransferTypeMapper.ConvertToApiEntitiesCollection(TransferTypeAdapter.GetAll($"language_id={Language.Id}")).ToList();
            Frequencies = FrequencyMapper.ConvertToApiEntitiesCollection(FrequencyAdapter.GetAll($"language_id={Language.Id}")).ToList();
            Importances = ImportanceMapper.ConvertToApiEntitiesCollection(ImportanceAdapter.GetAll($"language_id={Language.Id}")).ToList();
            Tags = TagMapper.ConvertToApiEntitiesCollection(TagAdapter.GetAll($"language_id={Language.Id}")).ToList();
        }

        private void LoadOperations()
        {
            var operations = OperationAdapter.GetAll($"user_id={User.Id}");
            var filter = "";
            foreach (var operation in operations)
            {
                filter += $"operation_id={operation.Id} OR ";
            }
            filter = filter.Substring(0, filter.Length - 4);

            var relations = OperationTagRelationAdapter.GetAll(filter).ToList();
            var details = OperationDetailsAdapter.GetAll(filter).ToList();
            OperationMapper.Update(Importances, Frequencies, TransactionTypes, TransferTypes, Tags, User, relations, details);
            Operations = OperationMapper.ConvertToApiEntitiesCollection(operations).ToList();
        }

        private void LoadOperationsGroups()
        {
            var groups = OperationsGroupAdapter.GetAll($"user_id={User.Id}");
            var filter = "";
            foreach (var group in groups)
            {
                filter += $"operation_group_id={group.Id} OR ";
            }
            filter = filter.Substring(0, filter.Length - 4);

            var relations = OperationsGroupRelationAdapter.GetAll(filter).ToList();

            OperationsGroupMapper.Update(OperationMapper, Importances,Tags,Frequencies, Operations, User, relations);
            OperationsGroups = OperationsGroupMapper.ConvertToApiEntitiesCollection(OperationsGroupAdapter.GetAll($"user_id={User.Id}")).ToList();
        }

        public (IEnumerable<DalOperation>, IEnumerable<DalOperationTags>, IEnumerable<DalOperationDetails>) GetDalOperations(IEnumerable<ApiOperation> apiObjects)
        {
            return OperationMapper.ConvertToDALEntitiesCollection(apiObjects);
        }
    }
}
