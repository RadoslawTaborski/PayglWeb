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
        IEnumerable<ApiTransferType> GetTransferTypes();
        IEnumerable<ApiFrequency> GetFrequencies();
        IEnumerable<ApiImportance> GetImportances();
        IEnumerable<ApiTag> GetTags();
        IEnumerable<ApiOperation> GetOperations();
        (IEnumerable<DalOperation>, IEnumerable<DalOperationTags>, IEnumerable<DalOperationDetails>) GetDalOperations(IEnumerable<ApiOperation> apiObjects);
        IEnumerable<ApiOperationsGroup> GetOperationsGroups();
    }
}
