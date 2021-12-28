using DataBaseWithBusinessLogicConnector.ApiEntities;
using DataBaseWithBusinessLogicConnector.DalEntities;
using PayglService.DashboardOutputElements;
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

        IEnumerable<ApiFilter> GetFilters();
        ApiFilter GetFilter(int id);

        IEnumerable<ApiDashboard> GetDashboards();
        ApiDashboard GetDashboard(int id);

        IEnumerable<ApiTag> GetTags();
        ApiTag GetTag(int id);
        IEnumerable<ApiOperation> GetOperations(bool withoutParent = false);
        ApiOperation GetOperation(int id);
        IEnumerable<ApiOperation> GetOperations(DateTime from, DateTime to, bool withoutParent = false);

        IEnumerable<ApiOperationsGroup> GetOperationsGroups();
        ApiOperationsGroup GetOperationsGroup(int id);
        IEnumerable<ApiOperationsGroup> GetOperationsGroups(DateTime from, DateTime to);
        void DeleteFilter(int id);
        void UpdateOperationsGroupComplex(ApiOperationsGroup group);
        void UpdateOperationComplex(ApiOperation newOperation);

        List<IDashboardOutput> GetDashboardsOutputs();
        List<IDashboardOutput> GetDashboardsOutputs(DateTime from, DateTime to);
        IDashboardOutput GetDashboardOutput(string query, DateTime from, DateTime to);
        void UpdateFilter(ApiFilter filter);
        IDashboardOutput GetDashboardOutput(string query);
        IDashboardOutput GetDashboardOutput(int dashboardId, DateTime from, DateTime to);
        IDashboardOutput GetDashboardOutput(int dashboardId);
        void UpdateDashboards(ApiDashboard[] dashboards);

        IEnumerable<ApiOperation> GetOperationsFromSchematics(int bankId, List<string> lines);
        IEnumerable<ApiBank> GetBanks();
        IEnumerable<ApiSchematic> GetSchematics();
        void UpdateSchematic(ApiSchematic schematic);
        ApiBank GetBanks(int id);
        ApiSettings GetSettings();
    }
}
