using DataAccess;
using DataAccess.Interfaces;
using DataBaseWithBusinessLogicConnector;
using DataBaseWithBusinessLogicConnector.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataBaseWithBusinessLogicConnector.ApiEntities;
using DataBaseWithBusinessLogicConnector.Interfaces;
using PayglService.DashboardOutputElements;

namespace PayglService
{
    public class Repository : IRepository
    {
        private ApiAdapter _apiAdapter;
        private EntityAdapter _entityAdapter;

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
        public List<ApiFilter> Filters { get; private set; }
        public List<ApiDashboard> Dashboards { get; private set; }
        #endregion

        public Repository(IDataBaseManagerFactory dbEngine)
        {
            ConfigurationManager.ReadConfig();
            var dataBaseData = ConfigurationManager.DataBaseData();
            _apiAdapter = new ApiAdapter(dbEngine, dataBaseData.Address, dataBaseData.Port, dataBaseData.Table, dataBaseData.Login, dataBaseData.Password);
            _entityAdapter = new EntityAdapter();

            Login("rado", "1234");
        }

        public void Login(string login, string password)
        {
            LoadUserAndLanguage(login, password);
            LoadSettings();
            LoadAttributes();
            ReloadData();
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

        public IEnumerable<ApiFilter> GetFilters()
        {
            return Filters;
        }

        public ApiFilter GetFilter(int id)
        {
            return Filters.Where(x => x.Id == id).FirstOrDefault();
        }

        public IEnumerable<ApiDashboard> GetDashboards()
        {
            return Dashboards;
        }

        public ApiDashboard GetDashboard(int id)
        {
            return Dashboards.Where(x => x.Id == id).FirstOrDefault();
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

        public IEnumerable<ApiOperation> GetFilteredOperations(DateTime from, DateTime to, string query)
        {
            var operations = _entityAdapter.GetOperations(Operations);
            operations = operations.Where(o => o.Parent == null && o.Date.Date <= to.Date && o.Date.Date >= from.Date).ToList();

            return Analyze(query, operations);
        }

        public IEnumerable<ApiOperation> GetFilteredOperations(string query)
        {
            var operations = _entityAdapter.GetOperations(Operations);
            operations = operations.Where(o => o.Parent == null).ToList();

            return Analyze(query, operations);
        }

        public IEnumerable<ApiOperationsGroup> GetFilteredOperationsGroups(DateTime from, DateTime to, string query)
        {
            var operationsGroups = _entityAdapter.GetOperationsGroups(OperationsGroups);
            operationsGroups = operationsGroups.Where(o => o.Date.Date <= to.Date && o.Date.Date >= from.Date).ToList();

            return Analyze(query, operationsGroups);
        }

        public IEnumerable<ApiOperationsGroup> GetFilteredOperationsGroups(string query)
        {
            var operationsGroups = _entityAdapter.GetOperationsGroups(OperationsGroups);

            return Analyze(query, operationsGroups);
        }

        public IDashboardOutput GetDashboardOutput(int dashboardId, DateTime from, DateTime to)
        {
            var dashboard = Dashboards.Where(d => d.Id == dashboardId).First();
            if (dashboard == null)
            {
                return null;
            }
            var iOperations = new List<IOperation>();
            var operations = _entityAdapter.GetOperations(Operations);
            iOperations.AddRange(operations.Where(o => o.Parent == null && o.Date.Date <= to.Date && o.Date.Date >= from.Date).ToList());

            var operationsGroups = _entityAdapter.GetOperationsGroups(OperationsGroups);
            iOperations.AddRange(operationsGroups.Where(o => o.Date.Date <= to.Date && o.Date.Date >= from.Date).ToList());

            return GenerateDashboardOutput(dashboard, iOperations);
        }

        public IDashboardOutput GetDashboardOutput(int dashboardId)
        {
            var dashboard = Dashboards.Where(d => d.Id == dashboardId).First();
            if (dashboard == null)
            {
                return null;
            }

            var iOperations = new List<IOperation>();
            var operations = _entityAdapter.GetOperations(Operations);
            iOperations.AddRange(operations.Where(o => o.Parent == null).ToList());

            var operationsGroups = _entityAdapter.GetOperationsGroups(OperationsGroups);
            iOperations.AddRange(operationsGroups);

            return GenerateDashboardOutput(dashboard, iOperations);
        }

        private IDashboardOutput GenerateDashboardOutput(ApiDashboard dashboard, List<IOperation> iOperations)
        {
            var root = new DashboardOutput();
            root.Name = dashboard.Name;
            var generator = new DashboardOutputGenerator();
            generator.Generate(ref root, _entityAdapter.GetDashboard(dashboard), iOperations, _entityAdapter);

            return root;
        }

        public async void UpdateOperationsGroupComplex(ApiOperationsGroup group)
        {
            _apiAdapter.UpdateOperationsGroupComplex(group);
            await Task.Run(() => ReloadData());
        }

        public async void UpdateOperationComplex(ApiOperation newOperation)
        {
            _apiAdapter.UpdateOperationComplex(newOperation);
            await Task.Run(() => ReloadData());
        }

        private void LoadUserAndLanguage(string login, string password)
        {
            var mainData = _apiAdapter.GetUserAndLanguage(login, password);
            User = mainData.User;
            Language = mainData.Language;
        }

        private void LoadAttributes()
        {
            TransactionTypes = _apiAdapter.GetTransactionTypes(Language);
            TransferTypes = _apiAdapter.GetTransferTypes(Language);
            Frequencies = _apiAdapter.GetFrequencies(Language);
            Importances = _apiAdapter.GetImportances(Language);
            Tags = _apiAdapter.GetTags(Language);
        }

        private void LoadSettings()
        {
            LoadFilters(User);
            LoadDashboards(User);
        }

        private void ReloadData()
        {
            LoadOperations(User);
            LoadOperationsGroups(User);
        }

        private void LoadOperations(ApiUser user)
        {
            Operations = _apiAdapter.GetOperations(user, TransactionTypes, TransferTypes, Frequencies, Importances, Tags);
        }

        private void LoadOperationsGroups(ApiUser user)
        {
            OperationsGroups = _apiAdapter.GetOperationsGroups(user, Operations, Frequencies, Importances, Tags);
        }

        private void LoadDashboards(ApiUser user)
        {
            Dashboards = _apiAdapter.GetDashboards(user, Filters);
        }

        private void LoadFilters(ApiUser user)
        {
            Filters = _apiAdapter.GetFilters(user);
        }

        private IEnumerable<ApiOperation> Analyze(string query, IEnumerable<Operation> operations)
        {
            var ioperations = new List<IOperation>();
            ioperations.AddRange(operations);

            var queryWithName = new KeyValuePair<string, string>("", query);

            var filter = new Filter(queryWithName.Key, queryWithName.Value);
            var analyzerRunner = new AnalyzerRunner();
            var filteredOperations = analyzerRunner.Run(filter, ioperations);

            var tmp = _entityAdapter.GetApiOperations(filteredOperations.ConvertAll(o => (Operation)o));
            return tmp;
        }

        private IEnumerable<ApiOperationsGroup> Analyze(string query, IEnumerable<OperationsGroup> operations)
        {
            var ioperations = new List<IOperation>();
            ioperations.AddRange(operations);

            var queryWithName = new KeyValuePair<string, string>("", query);

            var filter = new Filter(queryWithName.Key, queryWithName.Value);
            var analyzerRunner = new AnalyzerRunner();
            var filteredOperations = analyzerRunner.Run(filter, ioperations);

            var tmp = _entityAdapter.GetApiOperationsGroups(filteredOperations.ConvertAll(o => (OperationsGroup)o));
            return tmp;
        }


    }
}
