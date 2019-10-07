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
        IEnumerable<OperationComplex> GetDalOperations(IEnumerable<ApiOperation> apiObjects);
        OperationComplex GetDalOperation(ApiOperation apiObjects);

        IEnumerable<ApiOperationsGroup> GetOperationsGroups();
        ApiOperationsGroup GetOperationsGroup(int id);
        IEnumerable<ApiOperationsGroup> GetOperationsGroups(DateTime from, DateTime to);
        IEnumerable<OperationsGroupComplex> GetDalOperationsGroups(IEnumerable<ApiOperationsGroup> apiObjects);
        OperationsGroupComplex GetDalOperationsGroup(ApiOperationsGroup apiObjects);

        void UpdateOperationsGroupComplex(ApiOperationsGroup group);
        void UpdateOperationComplex(ApiOperation newOperation);
    }
}
