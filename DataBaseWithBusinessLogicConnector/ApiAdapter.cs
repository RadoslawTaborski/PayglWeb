using DataAccess;
using DataAccess.Interfaces;
using DataBaseWithBusinessLogicConnector.ApiEntities;
using DataBaseWithBusinessLogicConnector.DalApiMappers;
using DataBaseWithBusinessLogicConnector.DalEntities;
using DataBaseWithBusinessLogicConnector.DbAdapters;
using DataBaseWithBusinessLogicConnector.Interfaces.Dal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector
{
    public class ApiAdapter
    {
        private IDataAccess DbManager { get; set; }
        private DbConnector DbConnector { get; set; }

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
        private FilterAdapter FilterAdapter { get; }
        private DashboardAdapter DashboardAdapter { get; }
        private DashboardFilterRelationAdapter DashboardFilterRelationAdapter { get; }
        private BankAdapter BankAdapter { get; }
        private SettingsAdapter SettingsAdapter { get; }
        private SchematicTypeAdapter SchematicTypeAdapter { get; }
        private SchematicAdapter SchematicAdapter { get; }

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
        private FilterMapper FilterMapper { get; set; }
        private DashboardMapper DashboardMapper { get; set; }
        private DashboardFilterMapper DashboardFilterMapper { get; set; }
        private BankMapper BankMapper { get; set; }
        private SettingsMapper SettingsMapper { get; set; }
        private SchematicTypeMapper SchematicTypeMapper {get; set;}
        private SchematicMapper SchematicMapper { get; set; }
    
        #endregion

        public ApiAdapter(IDataBaseManagerFactory dbEngine, string address, string port, string table, string login, string password)
        {
            DbManager = new DatabaseManager(dbEngine, address, port, table, login, password);
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
            FilterAdapter = new FilterAdapter(DbConnector);
            DashboardAdapter = new DashboardAdapter(DbConnector);
            DashboardFilterRelationAdapter = new DashboardFilterRelationAdapter(DbConnector);
            BankAdapter = new BankAdapter(DbConnector);
            SettingsAdapter = new SettingsAdapter(DbConnector);
            SchematicTypeAdapter = new SchematicTypeAdapter(DbConnector);
            SchematicAdapter = new SchematicAdapter(DbConnector);

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
            FilterMapper = new FilterMapper();
            DashboardMapper = new DashboardMapper();
            DashboardFilterMapper = new DashboardFilterMapper();
            BankMapper = new BankMapper();
            SettingsMapper = new SettingsMapper();
            SchematicTypeMapper = new SchematicTypeMapper();
            SchematicMapper = new SchematicMapper();
        }

        public void UpdateDashboardComplex(ref ApiDashboard dashboard)
        {
            if (dashboard.IsMarkForDeletion)
            {
                DeleteDashboard(dashboard);
            }
            else if (dashboard.IsDirty && dashboard.Id == null)
            {
                InsertDashboard(ref dashboard);
            }
            else if (dashboard.IsDirty)
            {
                UpdateDashboard(dashboard);
            }
        }

        private void UpdateDashboard(ApiDashboard dashboard)
        {
            var tmp = DashboardMapper.ConvertToDALEntity(dashboard);
            foreach (var relation in tmp.Relations)
            {
                Update(relation, DashboardFilterRelationAdapter);
            }
            DashboardAdapter.Update(tmp.Dashboard);
        }

        private void InsertDashboard(ref ApiDashboard dashboard)
        {
            var tmp = DashboardMapper.ConvertToDALEntity(dashboard);

            var idx = DashboardAdapter.Insert(tmp.Dashboard);
            dashboard.UpdateId(idx);
            foreach (var relation in tmp.Relations)
            {
                relation.UpdateDashboardId(idx);
                DashboardFilterRelationAdapter.Insert(relation);
            }
        }

        private void DeleteDashboard(ApiDashboard dashboard)
        {
            var tmp = DashboardMapper.ConvertToDALEntity(dashboard);
            foreach (var relation in tmp.Relations)
            {
                DashboardFilterRelationAdapter.Delete(relation.Id);
            }
            DashboardAdapter.Delete(tmp.Dashboard.Id);
        }

        public bool DeleteFilter(int id)
        {
            FilterAdapter.Delete(id);
            return true;
        }

        public bool UpdateFilter(ApiFilter filter)
        {
            var dalFilter = FilterMapper.ConvertToDALEntity(filter);
            var id = Update(dalFilter, FilterAdapter);
            return true;
        }

        public List<ApiLanguage> GetLanguages()
        {
            return LanguageMapper.ConvertToApiEntitiesCollection(LanguageAdapter.GetAll()).ToList();
        }

        public List<ApiBank> GetBanks()
        {
            return BankMapper.ConvertToApiEntitiesCollection(BankAdapter.GetAll()).ToList();
        }

        public List<ApiSchematicType> GetSchematicTypes()
        {
            return SchematicTypeMapper.ConvertToApiEntitiesCollection(SchematicTypeAdapter.GetAll()).ToList();
        }

        public List<ApiSchematic> GetSchematic(ApiUser user, List<ApiSchematicType> schematicTypes)
        {
            SchematicMapper.Update(user, schematicTypes);
            return SchematicMapper.ConvertToApiEntitiesCollection(SchematicAdapter.GetAll($"user_id={user.Id}")).ToList();
        }

        public ApiSettings GetSettings(ApiUser user)
        {
            SettingsMapper.Update(user);
            return SettingsMapper.ConvertToApiEntitiesCollection(SettingsAdapter.GetAll($"user_id={user.Id}")).LastOrDefault();
        }

        public (ApiUser User, ApiLanguage Language) GetUserAndLanguage(string login, string password)
        {
            var languages = LanguageMapper.ConvertToApiEntitiesCollection(LanguageAdapter.GetAll()).ToList();

            DalUser dalUser = null;
            var dalUsers = UserAdapter.GetAll($"login='{login}'");
            var enumerable = dalUsers.ToList();
            if (enumerable.Count() == 0)
            {
                throw new NotImplementedException(); //TODO:
            }

            if (enumerable.ElementAt(0).Password == $"{password}")
            {
                dalUser = enumerable.ElementAt(0);
            }
            else
            {
                throw new NotImplementedException(); //TODO:
            }
            var language = languages.Where(l => l.Id == dalUser.LanguageId).First();
            var userDetails = UserDetailsMapper.ConvertToApiEntity(UserDetailsAdapter.GetById(dalUser.DetailsId));
            UserMapper.Update(language, userDetails);

            var user = UserMapper.ConvertToApiEntity(dalUser);
            return (user, language);
        }

        public List<ApiTransactionType> GetTransactionTypes(ApiLanguage language)
        {
            return TransactionTypeMapper.ConvertToApiEntitiesCollection(TransactionTypeAdapter.GetAll($"language_id={language.Id}")).ToList();
        }

        public List<ApiTransferType> GetTransferTypes(ApiLanguage language)
        {
            return TransferTypeMapper.ConvertToApiEntitiesCollection(TransferTypeAdapter.GetAll($"language_id={language.Id}")).ToList();
        }

        public List<ApiFrequency> GetFrequencies(ApiLanguage language)
        {
            return FrequencyMapper.ConvertToApiEntitiesCollection(FrequencyAdapter.GetAll($"language_id={language.Id}")).ToList();
        }

        public List<ApiImportance> GetImportances(ApiLanguage language)
        {
            return ImportanceMapper.ConvertToApiEntitiesCollection(ImportanceAdapter.GetAll($"language_id={language.Id}")).ToList();
        }

        public List<ApiTag> GetTags(ApiLanguage language)
        {
            return TagMapper.ConvertToApiEntitiesCollection(TagAdapter.GetAll($"language_id={language.Id}")).ToList();
        }

        public List<ApiOperation> GetOperations(ApiUser user, List<ApiTransactionType> transactionTypes, List<ApiTransferType> transferTypes, List<ApiFrequency> frequencies, List<ApiImportance> importances, List<ApiTag> tags)
        {
            var operations = OperationAdapter.GetAll($"user_id={user.Id}");
            var filter = "";
            foreach (var operation in operations)
            {
                filter += $"operation_id={operation.Id} OR ";
            }
            if (filter.Length > 4)
            {
                filter = filter.Substring(0, filter.Length - 4);
            }

            var relations = OperationTagRelationAdapter.GetAll(filter).ToList();
            var details = OperationDetailsAdapter.GetAll(filter).ToList();
            OperationMapper.Update(importances, frequencies, transactionTypes, transferTypes, tags, user, relations, details);

            return OperationMapper.ConvertToApiEntitiesCollection(operations).ToList();
        }

        public List<ApiOperationsGroup> GetOperationsGroups(ApiUser user, List<ApiOperation> operations, List<ApiFrequency> frequencies, List<ApiImportance> importances, List<ApiTransactionType> types, List<ApiTag> tags)
        {
            var groups = OperationsGroupAdapter.GetAll($"user_id={user.Id}");
            var filter = "";
            foreach (var group in groups)
            {
                filter += $"operation_group_id={group.Id} OR ";
            }
            if (filter.Length > 4)
            {
                filter = filter.Substring(0, filter.Length - 4);
            }

            var relations = OperationsGroupRelationAdapter.GetAll(filter).ToList();

            OperationsGroupMapper.Update(OperationMapper, importances, tags, frequencies, operations, user, relations, types);
            return OperationsGroupMapper.ConvertToApiEntitiesCollection(OperationsGroupAdapter.GetAll($"user_id={user.Id}")).ToList();
        }

        public List<ApiDashboard> GetDashboards(ApiUser user, List<ApiFilter> filters)
        {
            DashboardMapper.Update(user);
            var dashboards = DashboardMapper.ConvertToApiEntitiesCollection(DashboardAdapter.GetAll($"user_id={user.Id}")).ToList();
            var filter = "";
            foreach (var dashboard in dashboards)
            {
                filter += $"dashboard_id={dashboard.Id} OR ";
            }
            if (filter.Length > 4)
            {
                filter = filter.Substring(0, filter.Length - 4);
            }

            DashboardFilterMapper.Update(filters, dashboards);
            var tmp = DashboardFilterRelationAdapter.GetAll(filter).GroupBy(t => t.DashboardId);

            foreach (var group in tmp)
            {
                dashboards.Where(t => t.Id == group.Key).FirstOrDefault().UpdateRelations(DashboardFilterMapper.ConvertToApiEntitiesCollection(group));
            }

            return dashboards.OrderBy(o=>o.Order).ToList();
        }

        public List<ApiFilter> GetFilters(ApiUser user)
        {
            FilterMapper.Update(user);
            return FilterMapper.ConvertToApiEntitiesCollection(FilterAdapter.GetAll($"user_id={user.Id}")).ToList();
        }

        public void UpdateOperationsGroupComplex(ApiOperationsGroup group)
        {
            var dalObjects = OperationsGroupMapper.ConvertToDALEntity(group);
            var dalOperationsGroup = dalObjects.Group;
            var dalOperationsGroupTags = dalObjects.Tags;
            var dalOperations = dalObjects.Operations;

            var id = Update(dalOperationsGroup, OperationsGroupAdapter);
            foreach (var dalOperationsGroupTag in dalOperationsGroupTags)
            {
                dalOperationsGroupTag.UpdateOperationsGroupId(id.Value);
                Update(dalOperationsGroupTag, OperationsGroupRelationAdapter);
            }
            foreach (var dalOperation in dalOperations)
            {
                UpdateOperationComplex(dalOperation);
            }
        }

        public void UpdateOperationComplex(ApiOperation newOperation)
        {
            var dalObjects = OperationMapper.ConvertToDALEntity(newOperation);
            UpdateOperationComplex(dalObjects);
        }

        public bool UpdateSchematic(ApiSchematic schematic)
        {
            var dalObjects = SchematicMapper.ConvertToDALEntity(schematic);
            var id = Update(dalObjects, SchematicAdapter);
            return true;
        }

        private void UpdateOperationComplex(OperationComplex dalObjects)
        {
            var dalOperation = dalObjects.Operation;
            var dalOperationTags = dalObjects.Tags;
            var dalOperationDetails = dalObjects.Details;

            var id = Update(dalOperation, OperationAdapter);
            foreach (var dalOperationTag in dalOperationTags)
            {
                dalOperationTag.UpdateOperationId(id.Value);
                Update(dalOperationTag, OperationTagRelationAdapter);
            }
            foreach (var dalOperationDetail in dalOperationDetails)
            {
                dalOperationDetail.UpdateOperationId(id.Value);
                Update(dalOperationDetail, OperationDetailsAdapter);
            }
        }

        private int? Update<T>(T entity, IAdapter<T> adapter) where T : IDalEntity
        {
            if (entity.IsMarkForDeletion)
            {
                adapter.Delete(entity.Id);
            }
            else if (entity.IsDirty && entity.Id == null)
            {
                var id = adapter.Insert(entity);
                return id;
            }
            else if (entity.IsDirty)
            {
                adapter.Update(entity);
            }
            return entity.Id;
        }
    }
}
