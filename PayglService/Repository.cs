using DataAccess;
using DataAccess.Interfaces;
using DataBaseWithBusinessLogicConnector;
using DataBaseWithBusinessLogicConnector.DbAdapters;
using DataBaseWithBusinessLogicConnector.DalEntities;
using DataBaseWithBusinessLogicConnector.DalApiMappers;
using DataBaseWithBusinessLogicConnector.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataBaseWithBusinessLogicConnector.ApiEntities;
using DataBaseWithBusinessLogicConnector.Interfaces.Dal;
using DataBaseWithBusinessLogicConnector.Interfaces;
using DataBaseWithBusinessLogicConnector.Helpers;

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
        private LanguageMapper LanguageMapper { get; set; }
        private UserMapper UserMapper { get; set; }
        private UserDetailsMapper UserDetailsMapper { get; set; }
        private TransactionTypeMapper TransactionTypeMapper { get; set; }
        private TransferTypeMapper TransferTypeMapper { get; set; }
        private FrequencyMapper FrequencyMapper { get; set; }
        private ImportanceMapper ImportanceMapper { get; set; }
        private TagMapper TagMapper { get; set; }
        private OperationDetailsMapper OperationDetailsMapper { get; set; }
        private RelationTagMapper TagRelationMapper { get; set; }
        private OperationMapper OperationMapper { get; set; }
        private OperationsGroupMapper OperationsGroupMapper { get; set; }
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

            LanguageMapper = new LanguageMapper();
            UserMapper = new UserMapper();
            UserDetailsMapper = new UserDetailsMapper();
            TransactionTypeMapper = new TransactionTypeMapper();
            TransferTypeMapper = new TransferTypeMapper();
            FrequencyMapper = new FrequencyMapper();
            ImportanceMapper = new ImportanceMapper();
            TagMapper = new TagMapper();
            TagRelationMapper = new RelationTagMapper();
            OperationMapper = new OperationMapper();
            OperationsGroupMapper = new OperationsGroupMapper();

            LoadUserAndLanguage();
            LoadAttributes();
            ReloadData();
        }

        private void ReloadData()
        {
            LoadOperations();
            LoadOperationsGroups();
        }

        public IEnumerable<ApiTransactionType> GetTransactionTypes()
        {
            return TransactionTypes;
        }

        public ApiTransactionType GetTransactionType(int id)
        {
            return TransactionTypes.Where(x => x.Id == id).FirstOrDefault();
        }

        public IEnumerable<ApiTransferType> GetTransferTypes()
        {
            return TransferTypes;
        }

        public ApiTransferType GetTransferType(int id)
        {
            return TransferTypes.Where(x => x.Id == id).FirstOrDefault();
        }

        public IEnumerable<ApiFrequency> GetFrequencies()
        {
            return Frequencies;
        }

        public ApiFrequency GetFrequency(int id)
        {
            return Frequencies.Where(x => x.Id == id).FirstOrDefault();
        }

        public IEnumerable<ApiImportance> GetImportances()
        {
            return Importances;
        }

        public ApiImportance GetImportance(int id)
        {
            return Importances.Where(x => x.Id == id).FirstOrDefault();
        }

        public IEnumerable<ApiTag> GetTags()
        {
            return Tags;
        }

        public ApiTag GetTag(int id)
        {
            return Tags.Where(x => x.Id == id).FirstOrDefault();
        }

        public IEnumerable<ApiOperation> GetOperations(bool withoutParent = false)
        {
            if (!withoutParent)
            {
                return Operations;
            }
            else
            {
                return Operations.Where(x => x.GroupId == null);
            }
        }

        public ApiOperation GetOperation(int id)
        {
            return Operations.Where(x => x.Id == id).FirstOrDefault();
        }

        public IEnumerable<ApiOperation> GetOperations(DateTime from, DateTime to, bool withoutParent = false)
        {
            if (!withoutParent)
            {
                return Operations.Where(x => DateTime.Parse(x.Date) >= from && DateTime.Parse(x.Date) <= to);
            }
            else
            {
                return Operations.Where(x => DateTime.Parse(x.Date) > from && DateTime.Parse(x.Date) < to && x.GroupId == null);
            }
        }

        public (IEnumerable<DalOperation>, IEnumerable<DalOperationTags>, IEnumerable<DalOperationDetails>) GetDalOperations(IEnumerable<ApiOperation> apiObjects)
        {
            return OperationMapper.ConvertToDALEntitiesCollection(apiObjects);
        }

        public (DalOperation, IEnumerable<DalOperationTags>, IEnumerable<DalOperationDetails>) GetDalOperation(ApiOperation apiObjects)
        {
            return OperationMapper.ConvertToDALEntity(apiObjects);
        }

        public IEnumerable<ApiOperationsGroup> GetOperationsGroups()
        {
            return OperationsGroups;
        }

        public IEnumerable<ApiOperationsGroup> GetOperationsGroups(DateTime from, DateTime to)
        {
            return OperationsGroups.Where(x => DateTime.Parse(x.Date) >= from && DateTime.Parse(x.Date) <= to);
        }

        public ApiOperationsGroup GetOperationsGroup(int id)
        {
            return OperationsGroups.Where(x => x.Id == id).FirstOrDefault();
        }

        public (IEnumerable<DalOperationsGroup>, IEnumerable<DalOperationsGroupTags>, IEnumerable<DalOperation>, IEnumerable<DalOperationTags>, IEnumerable<DalOperationDetails>) GetDalOperationsGroups(IEnumerable<ApiOperationsGroup> apiObjects)
        {
            return OperationsGroupMapper.ConvertToDALEntitiesCollection(apiObjects);
        }

        public (DalOperationsGroup, IEnumerable<DalOperationsGroupTags>, IEnumerable<DalOperation>, IEnumerable<DalOperationTags>, IEnumerable<DalOperationDetails>) GetDalOperationsGroup(ApiOperationsGroup apiObjects)
        {
            return OperationsGroupMapper.ConvertToDALEntity(apiObjects);
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
            UserMapper.Update(Language, UserDetails);

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
            TagRelationMapper.Update(Tags);
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

            OperationsGroupMapper.Update(OperationMapper, Importances, Tags, Frequencies, Operations, User, relations);
            OperationsGroups = OperationsGroupMapper.ConvertToApiEntitiesCollection(OperationsGroupAdapter.GetAll($"user_id={User.Id}")).ToList();
        }

        public async void UpdateOperationsGroupComplex(ApiOperationsGroup group)
        {
            var dalObjects = OperationsGroupMapper.ConvertToDALEntity(group);
            var dalOperationsGroup = dalObjects.Item1;
            var dalOperationsGroupTags = dalObjects.Item2;
            var dalOperations = dalObjects.Item3;
            var dalOperationsTags = dalObjects.Item4;
            var dalOperationsDetails = dalObjects.Item5;

            Update(dalOperationsGroup, OperationsGroupAdapter);
            foreach (var dalOperationsGroupTag in dalOperationsGroupTags)
            {
                Update(dalOperationsGroupTag, OperationsGroupRelationAdapter);
            }
            foreach (var dalOperation in dalOperations)
            {
                Update(dalOperation, OperationAdapter);
            }
            foreach (var dalOperationTag in dalOperationsTags)
            {
                Update(dalOperationTag, OperationTagRelationAdapter);
            }
            foreach (var dalOperationDetail in dalOperationsDetails)
            {
                Update(dalOperationDetail, OperationDetailsAdapter);
            }

            await Task.Run(() => ReloadData());
        }

        public async void UpdateOperationComplex(ApiOperation newOperation){
            var dalObjects = OperationMapper.ConvertToDALEntity(newOperation);
            var dalOperation = dalObjects.Item1;
            var dalOperationTags = dalObjects.Item2;
            var dalOperationDetails = dalObjects.Item3;

            Update(dalOperation, OperationAdapter);
            foreach (var dalOperationTag in dalOperationTags)
            {
                Update(dalOperationTag, OperationTagRelationAdapter);
            }
            foreach (var dalOperationDetail in dalOperationDetails)
            {
                Update(dalOperationDetail, OperationDetailsAdapter);
            }

            await Task.Run(() => ReloadData());
        }

        private void Update<T>(T entity, IAdapter<T> adapter) where T : IDalEntity
        {
            if (entity.IsMarkForDeletion)
            {
                adapter.Delete(entity);
            } else if(entity.IsDirty && entity.Id == null)
            {
                adapter.Insert(entity);
            } else if(entity.IsDirty)
            {
                adapter.Update(entity);
            }
        }
    }
}
