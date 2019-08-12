using DataBaseWithBusinessLogicConnector.ApiEntities;
using DataBaseWithBusinessLogicConnector.DalEntities;
using DataBaseWithBusinessLogicConnector.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayglService
{
    public interface IRepository
    {
        IEnumerable<ApiTransactionType> GetTransactionTypes();
        ApiTransactionType GetTransactionType(int id);

        IEnumerable<ApiTransferType> GetTransferTypes();
        ApiTransferType GetTransferType(int id);

        IEnumerable<ApiFrequency> GetFrequencies();
        ApiFrequency GetFrequency(int id);

        IEnumerable<ApiImportance> GetImportances();
        ApiImportance GetImportance(int id);

        IEnumerable<ApiTag> GetTags();
        ApiTag GetTag(int id);

        IEnumerable<ApiOperation> GetOperations(bool withoutParent = false);
        ApiOperation GetOperation(int id);
        IEnumerable<ApiOperation> GetOperations(DateTime from, DateTime to, bool withoutParent = false);
        (IEnumerable<DalOperation>, IEnumerable<DalOperationTags>, IEnumerable<DalOperationDetails>) GetDalOperations(IEnumerable<ApiOperation> apiObjects);
        (DalOperation, IEnumerable<DalOperationTags>, IEnumerable<DalOperationDetails>) GetDalOperation(ApiOperation apiObjects);

        IEnumerable<ApiOperationsGroup> GetOperationsGroups();
        ApiOperationsGroup GetOperationsGroup(int id);
        IEnumerable<ApiOperationsGroup> GetOperationsGroups(DateTime from, DateTime to);
        (IEnumerable<DalOperationsGroup>, IEnumerable<DalOperationsGroupTags>, IEnumerable<DalOperation>, IEnumerable<DalOperationTags>, IEnumerable<DalOperationDetails>) GetDalOperationsGroups(IEnumerable<ApiOperationsGroup> apiObjects);
        (DalOperationsGroup, IEnumerable<DalOperationsGroupTags>, IEnumerable<DalOperation>, IEnumerable<DalOperationTags>, IEnumerable<DalOperationDetails>) GetDalOperationsGroup(ApiOperationsGroup apiObjects);
    }
}
