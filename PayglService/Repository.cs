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

        public void UpdateOperationsGroupComplex(ApiOperationsGroup group)
        {
            var dalObjects = OperationsGroupMapper.ConvertToDALEntity(group);
            var dalOperationsGroup = dalObjects.Item1;

            var operationGroup = OperationsGroups.Where(o => o.Id == dalOperationsGroup.Id).FirstOrDefault();

            UpdateOperationsGroup(dalOperationsGroup);
            UpdateOperationsGroupTags(operationGroup.Id, group.Tags, operationGroup.Tags);
            RemoveOperationsFromGroup(operationGroup, group);
            foreach (var operation in group.Operations)
            {
                UpdateOperationComplex(operation);
            }

            operationGroup = group;
        }

        private void RemoveOperationsFromGroup(ApiOperationsGroup newGroup, ApiOperationsGroup oldGroup)
        {
            var operationsToRemove = oldGroup.Operations.Except(newGroup.Operations, new ApiOperationComparer());
            operationsToRemove = operationsToRemove.Where(o => !newGroup.Operations.Contains(o));

            foreach(var operation in operationsToRemove)
            {
                operation.GroupId = null;
                oldGroup.Operations.Where(o => operation.Id.Value == o.Id.Value).First();
                OperationAdapter.Update(OperationMapper.ConvertToDALEntity(operation).Item1);
            }
        }

        public void UpdateOperationComplex(ApiOperation newOperation){
            var dalObjects = OperationMapper.ConvertToDALEntity(newOperation);
            var dalOperation = dalObjects.Item1;
            var dalOperationsDetails = dalObjects.Item3;

            var operation = Operations.Where(o => o.Id.Value == newOperation.Id.Value).FirstOrDefault();

            UpdateOperation(dalOperation);
            UpdateOperationsTags(operation.Id, newOperation.Tags, operation.Tags);
            UpdateOperationsDetails(dalOperationsDetails);

            operation = newOperation;
        }

        private void UpdateOperationsGroup(DalOperationsGroup dalOperationsGroup)
        {
            OperationsGroupAdapter.Update(dalOperationsGroup);
        }

        private void UpdateOperationsGroupTags(int? groupId, ApiRelTag[] newTags, ApiRelTag[] tags)
        {
            var tagsToInsert = newTags.Except(tags, new ApiRelTagComparer());
            tagsToInsert = tagsToInsert.Where(t => !tags.Contains(t));
            var tagsToRemove = tags.Except(newTags, new ApiRelTagComparer());
            tagsToRemove = tagsToRemove.Where(t => !newTags.Contains(t));

            foreach (var tag in tagsToInsert) {
                OperationsGroupRelationAdapter.Insert(TagRelationMapper.ConvertToDALOperationsGroupEntity(tag, groupId.Value));
            }

            foreach (var tag in tagsToRemove)
            {
                OperationsGroupRelationAdapter.Delete(TagRelationMapper.ConvertToDALOperationsGroupEntity(tag, groupId.Value));
            }
        }

        private void UpdateOperations(IEnumerable<DalOperation> dalOperations, ApiOperation[] operations)
        {
            foreach (var operation in dalOperations)
            {
                UpdateOperation(operation);
            }
        }

        private void UpdateOperation(DalOperation operation)
        {
            OperationAdapter.Update(operation);
        }

        private void UpdateOperationsTags(int? operationId, ApiRelTag[] newTags, ApiRelTag[] tags)
        {
            var tagsToInsert = newTags.Except(tags, new ApiRelTagComparer());
            tagsToInsert = tagsToInsert.Where(t => !tags.Contains(t));
            var tagsToRemove = tags.Except(newTags, new ApiRelTagComparer());
            tagsToRemove = tagsToRemove.Where(t => !newTags.Contains(t));

            foreach (var tag in tagsToInsert)
            {
                OperationTagRelationAdapter.Insert(TagRelationMapper.ConvertToDALOperationEntity(tag, operationId.Value));
            }

            foreach (var tag in tagsToRemove)
            {
                OperationsGroupRelationAdapter.Delete(TagRelationMapper.ConvertToDALOperationsGroupEntity(tag, operationId.Value));
            }
        }

        private void UpdateOperationsDetails(IEnumerable<DalOperationDetails> dalOperationsDetails)
        {
            foreach (var details in dalOperationsDetails)
            {
                UpdateOperationDetails(details);
            }
        }

        private void UpdateOperationDetails(DalOperationDetails details)
        {
            OperationDetailsAdapter.Update(details);
        }

        //private void UpdateOperationTags(Operation operation, List<RelTag> parentTag)
        //{
        //    operation.Tags.ForEach(t => t.IsMarkForDeletion = true);
        //    foreach (var relTag in parentTag)
        //    {
        //        operation.AddTag(relTag.Tag);
        //    }
        //}

        //private int InsertRelation(RelTag tag, OperationsGroup group)
        //{
        //    if (tag.IsDirty)
        //    {
        //        var newId = OperationsGroupRelationAdapter.Insert(OperationsGroupRelationMapper.ConvertToDALEntity(tag, group));
        //        tag.UpdateId(newId);
        //        tag.IsDirty = false;
        //    }

        //    return tag.Id.Value;
        //}

        //private void DeleteRelation(RelTag tag, OperationsGroup group)
        //{
        //    group.RemoveTag(tag);
        //    OperationsGroupRelationAdapter.Delete(OperationsGroupRelationMapper.ConvertToDALEntity(tag, group));
        //}

        //public void UpdateOperationComplex(Operation operation)
        //{
        //    if (operation.DetailsList != null)
        //    {
        //        foreach (var item in operation.DetailsList)
        //        {
        //            UpdateOperationDetails(item, operation.Id.Value);
        //        }
        //    }

        //    UpdateOperation(operation);

        //    for (var i = operation.Tags.Count - 1; i > -1; i--)
        //    {
        //        var tag = operation.Tags[i];
        //        if (tag.IsMarkForDeletion && !tag.IsDirty)
        //        {
        //            DeleteRelation(tag, operation);
        //            continue;
        //        }
        //        if (tag.IsDirty)
        //        {
        //            InsertRelation(tag, operation);
        //        }
        //    }
        //}

        //#region private
        //#region Updates

        ////private int UpdateOperationDetails(ApiOperationDetails details, int operationId)
        ////{
        ////    return UpdateBusinessEntity(details, operationId, OperationDetailsAdapter, OperationDetailsMapper.);
        ////}

        //private int UpdateOperation(Operation operation)
        //{
        //    return UpdateBusinessEntity(operation, OperationAdapter, OperationMapper.ConvertToDALEntity);
        //}

        //private int UpdateOperationGroup(OperationsGroup group)
        //{
        //    return UpdateBusinessEntity(group, OperationsGroupAdapter, OperationsGroupMapper.ConvertToDALEntity);
        //}

        //private int UpdateUser(User user)
        //{
        //    return UpdateBusinessEntity(user, UserAdapter, UserMapper.ConvertToDALEntity);
        //}

        //private int UpdateUserDetails(UserDetails userDetails)
        //{
        //    return UpdateBusinessEntity(userDetails, UserDetailsAdapter, UserDetailsMapper.ConvertToDALEntity);
        //}

        //private int InsertRelation(Tag tag, Operation operation)
        //{
        //    var newId = OperationTagRelationAdapter.Insert(RelationMapper.ConvertToDALEntity(tag, operation));
        //    tag.UpdateId(newId);

        //    return tag.Id.Value;
        //}

        //private void DeleteRelation(Tag tag, Operation operation)
        //{
        //    operation.RemoveTag(tag);
        //    OperationTagRelationAdapter.Delete(RelationMapper.ConvertToDALEntity(tag, operation));
        //}

        //#endregion

        //#region UpdateBusinessEntity
        //private int UpdateBusinessEntity<Type, DalType>(Type entity, int id, IAdapter<DalType> adapter, Func<Type, int, DalType> convertToDALEntity)
        //where Type : IEntity where DalType : IDalEntity
        //{
        //    if (entity.Id == null)
        //    {
        //        var newId = adapter.Insert(convertToDALEntity(entity, id));
        //        entity.UpdateId(newId);
        //    }
        //    else
        //    {
        //        adapter.Update(convertToDALEntity(entity, id));
        //    }
        //    return entity.Id.Value;
        //}

        //private int UpdateBusinessEntity<Type, DalType>(Type entity, IAdapter<DalType> adapter, Func<Type, DalType> convertToDALEntity)
        //where Type : IEntity where DalType : IDalEntity
        //{
        //    if (entity.Id == null)
        //    {
        //        var newId = adapter.Insert(convertToDALEntity(entity));
        //        entity.UpdateId(newId);
        //    }
        //    else
        //    {
        //        adapter.Update(convertToDALEntity(entity));
        //    }
        //    return entity.Id.Value;
        //}
        //#endregion
        //#endregion
    }
}
