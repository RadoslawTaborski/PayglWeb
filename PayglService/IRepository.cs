using DataBaseWithBusinessLogicConnector.Dal.DalEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayglService
{
    public interface IRepository
    {
        IEnumerable<DalLanguage> GetLanguages();
        IEnumerable<DalUser> GetUsers();
        IEnumerable<DalUserDetails> GetUsersDetails();
        IEnumerable<DalTransactionType> GetTransactionTypes();
        IEnumerable<DalTransferType> GetTransferTypes();
        IEnumerable<DalFrequency> GetFrequencies();
        IEnumerable<DalImportance> GetImportancies();
        IEnumerable<DalTag> GetTags();
        IEnumerable<DalOperation> GetOperations();
        IEnumerable<DalOperationDetails> GetOperationsDetails();
        IEnumerable<DalOperationTags> GetOperationTags();
        IEnumerable<DalOperationsGroup> GetDalOperationsGroups();
        IEnumerable<DalOperationsGroupTag> GetOperationsGroupTags();
    }
}
