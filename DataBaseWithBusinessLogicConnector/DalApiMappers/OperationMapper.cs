using DataBaseWithBusinessLogicConnector.ApiEntities;
using DataBaseWithBusinessLogicConnector.DalEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.DalApiMappers
{
    public class OperationMapper
    {
        private List<ApiImportance> _importances;
        private List<ApiFrequency> _frequencies;
        private List<ApiTransactionType> _transactionTypes;
        private List<ApiTransferType> _transferTypes;
        private ApiUser _user;

        private List<DalOperationTags> _dalRelations;
        private List<DalOperationDetails> _dalDetails;

        private RelationTagMapper tagMapper = new RelationTagMapper();

        public void Update(List<ApiImportance> importances, List<ApiFrequency> frequencies, List<ApiTransactionType> transactionTypes, List<ApiTransferType> transferTypes, List<ApiTag> tags, ApiUser user, List<DalOperationTags> dalRelations, List<DalOperationDetails> dalDetails)
        {
            _importances = importances;
            _frequencies = frequencies;
            _transactionTypes = transactionTypes;
            _transferTypes = transferTypes;
            tagMapper.Update(tags);
            _user = user;
            _dalRelations = dalRelations;
            _dalDetails = dalDetails;
        }

        public IEnumerable<ApiOperation> ConvertToApiEntitiesCollection(IEnumerable<DalOperation> dataEntities)
        {
            var result = new List<ApiOperation>();

            foreach (var item in dataEntities)
            {
                result.Add(ConvertToApiEntity(item));
            }

            return result;
        }

        public ApiOperation ConvertToApiEntity(DalOperation dataEntity)
        {
            var frequency = _frequencies.First(f => f.Id == dataEntity.FrequencyId);
            var importance = _importances.First(f => f.Id == dataEntity.ImportanceId);
            var transferType = _transferTypes.First(f => f.Id == dataEntity.TransferTypeId);
            var transactionType = _transactionTypes.First(f => f.Id == dataEntity.TransactionTypeId);

            var dalTags = _dalRelations.Where(t => t.OperationId == dataEntity.Id);
            var tags = tagMapper.ConvertToApiEntitiesCollection(dalTags).ToArray();

            var dalDetails = _dalDetails.Where(d => d.OperationId == dataEntity.Id);
            var details = new OperationDetailsMapper().ConvertToApiEntitiesCollection(dalDetails).ToArray();

            var result = new ApiOperation(dataEntity.Id, dataEntity.ParentId, _user,dataEntity.Amount, transactionType, transferType,frequency,importance,dataEntity.Date,dataEntity.ReceiptPath, tags, details, dataEntity.Description);
            result.IsDirty = dataEntity.IsDirty;
            result.IsMarkForDeletion = dataEntity.IsMarkForDeletion;
            return result;
        }

        public IEnumerable<OperationComplex> ConvertToDALEntitiesCollection(IEnumerable<ApiOperation> dataEntities)
        {
            var result = new List<OperationComplex>();

            foreach (var item in dataEntities)
            {
                result.Add(ConvertToDALEntity(item));
            }

            return result;
        }

        public OperationComplex ConvertToDALEntity(ApiOperation businessEntity)
        {
            if (businessEntity?.User == null || businessEntity.TransactionType == null || businessEntity.TransferType == null || businessEntity.Frequency == null || businessEntity.Importance == null)
            {
                throw new ArgumentException(Properties.strings.ExWrongParameters);
            }
            var result1 = new DalOperation(businessEntity.Id, businessEntity.GroupId, businessEntity.User.Id, businessEntity.Description, businessEntity.Amount, businessEntity.TransactionType.Id, businessEntity.TransferType.Id, businessEntity.Frequency.Id, businessEntity.Importance.Id, businessEntity.Date, businessEntity.ReceiptPath);
            result1.IsDirty = businessEntity.IsDirty;
            result1.IsMarkForDeletion = businessEntity.IsMarkForDeletion;

            var result2 = new List<DalOperationTags>();
            foreach(var tag in businessEntity.Tags)
            {
                var operationTag = new DalOperationTags(tag.Id, businessEntity.Id, tag.Tag.Id);
                operationTag.IsDirty = tag.IsDirty;
                operationTag.IsMarkForDeletion = tag.IsMarkForDeletion;
                result2.Add(operationTag);
            }
            var result3 = new List<DalOperationDetails>();

            return new OperationComplex(result1, result2, result3);
        }
    }
}
