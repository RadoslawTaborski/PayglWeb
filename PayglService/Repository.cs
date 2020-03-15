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
using DataBaseWithBusinessLogicConnector.Interfaces.Api;
using Importer;
using System.Text.RegularExpressions;
using PayglService.Helpers;

namespace PayglService
{
    public class Repository : IRepository
    {
        private ApiAdapter _apiAdapter;

        #region Entities
        public ApiUser User { get; private set; }
        public ApiSettings Settings { get; private set; }
        public List<ApiBank> Banks { get; private set; }
        public List<ApiSchematicType> SchematicTypes { get; private set; }
        public List<ApiSchematic> Schematics { get; private set; }
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

            Login("rado", "1234");
        }

        public void Login(string login, string password)
        {
            LoadUserAndLanguage(login, password);
            LoadUserConfiguration();
            LoadAttributes();
            LoadSystemConfiguration();
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

        public async void DeleteFilter(int id)
        {
            _apiAdapter.DeleteFilter(id);
            await Task.Run(() => ReloadData());
        }

        public async void UpdateFilter(ApiFilter filter)
        {
            _apiAdapter.UpdateFilter(filter);
            await Task.Run(() => ReloadData());
        }

        private ApiDashboard[] RepairDashboardArray(ApiDashboard[] dashboards)
        {
            for (int i = 0; i < dashboards.Length; i++)
            {
                for (int j = 0; j < dashboards[i].Relations.Count; j++)
                {
                    if (dashboards[i].Relations[j].Filter is ApiDashboard)
                    {
                        dashboards[i].Relations[j].Filter = dashboards.Where(d => d.Name == dashboards[i].Relations[j].Filter.Name).FirstOrDefault();
                    }
                }
            }

            return dashboards;
        }

        public async void UpdateDashboards(ApiDashboard[] dashboards)
        {
            dashboards = RepairDashboardArray(dashboards);
            for (int i = 0; i < dashboards.Length; i++)
            {
                UpdateDashboard(ref dashboards[i]);
            }
            await Task.Run(() => ReloadData());
        }

        private void UpdateDashboard(ref ApiDashboard dashboard)
        {
            _apiAdapter.UpdateDashboardComplex(ref dashboard);
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

        public List<IDashboardOutput> GetDashboardsOutputs()
        {
            var result = new List<IDashboardOutput>();
            foreach (var dashboard in Dashboards.Where(d => d.IsVisible))
            {
                var iOperations = new List<IApiOperation>();

                iOperations.AddRange(Operations.Where(o => o.GroupId == null).ToList());
                iOperations.AddRange(OperationsGroups);

                result.Add(GenerateDashboardOutput(dashboard, iOperations));
            }

            return result;
        }

        public List<IDashboardOutput> GetDashboardsOutputs(DateTime from, DateTime to)
        {
            var result = new List<IDashboardOutput>();
            foreach (var dashboard in Dashboards.Where(d => d.IsVisible))
            {
                var iOperations = new List<IApiOperation>();

                iOperations.AddRange(Operations.Where(o => o.GroupId == null && o.GetDate() <= to.Date && o.GetDate() >= from.Date).ToList());
                iOperations.AddRange(OperationsGroups.Where(o => o.GetDate() <= to.Date && o.GetDate() >= from.Date).ToList());

                result.Add(GenerateDashboardOutput(dashboard, iOperations));
            }

            return result;
        }

        public IDashboardOutput GetDashboardOutput(string query, DateTime from, DateTime to)
        {
            var iOperations = new List<IApiOperation>();

            iOperations.AddRange(Operations.Where(o => o.GroupId == null && o.GetDate() <= to.Date && o.GetDate() >= from.Date).ToList());
            iOperations.AddRange(OperationsGroups.Where(o => o.GetDate() <= to.Date && o.GetDate() >= from.Date).ToList());

            return GenerateDashboardOutput(query, iOperations);
        }

        public IDashboardOutput GetDashboardOutput(string query)
        {
            var iOperations = new List<IApiOperation>();

            iOperations.AddRange(Operations.Where(o => o.GroupId == null).ToList());
            iOperations.AddRange(OperationsGroups);

            return GenerateDashboardOutput(query, iOperations);
        }

        public IDashboardOutput GetDashboardOutput(int dashboardId, DateTime from, DateTime to)
        {
            var dashboard = Dashboards.Where(d => d.Id == dashboardId).First();
            if (dashboard == null)
            {
                return null;
            }
            var iOperations = new List<IApiOperation>();

            iOperations.AddRange(Operations.Where(o => o.GroupId == null && o.GetDate() <= to.Date && o.GetDate() >= from.Date).ToList());
            iOperations.AddRange(OperationsGroups.Where(o => o.GetDate() <= to.Date && o.GetDate() >= from.Date).ToList());

            return GenerateDashboardOutput(dashboard, iOperations);
        }

        public IDashboardOutput GetDashboardOutput(int dashboardId)
        {
            var dashboard = Dashboards.Where(d => d.Id == dashboardId).First();
            if (dashboard == null)
            {
                return null;
            }

            var iOperations = new List<IApiOperation>();

            iOperations.AddRange(Operations.Where(o => o.GroupId == null).ToList());
            iOperations.AddRange(OperationsGroups);

            return GenerateDashboardOutput(dashboard, iOperations);
        }

        private IDashboardOutput GenerateDashboardOutput(ApiDashboard dashboard, List<IApiOperation> iOperations)
        {
            var root = new DashboardOutput();
            root.Name = dashboard.Name;
            var generator = new DashboardOutputGenerator();
            generator.Generate(ref root, dashboard, iOperations);

            return root;
        }

        private IDashboardOutput GenerateDashboardOutput(string query, List<IApiOperation> iOperations)
        {
            var root = new DashboardOutputLeaf();
            root.Name = "output";
            var generator = new DashboardOutputGenerator();
            generator.Generate(ref root, query, iOperations);

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

        public IEnumerable<ApiOperation> GetOperationsFromSchematics(int bankId, List<string> lines)
        {
            return Import(bankId, lines);
        }

        public IEnumerable<ApiSchematic> GetSchematics()
        {
            return Schematics;
        }

        public IEnumerable<ApiBank> GetBanks()
        {
            return Banks;
        }
        public ApiBank GetBanks(int id)
        {
            return Banks.Where(b => b.Id == id).FirstOrDefault();
        }

        public ApiSettings GetSettings()
        {
            return Settings;
        }

        private void LoadSystemConfiguration()
        {
            Banks = _apiAdapter.GetBanks();
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

        private void LoadUserConfiguration()
        {
            LoadSettings(User);
            LoadSchematics(User);
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
            OperationsGroups = _apiAdapter.GetOperationsGroups(user, Operations, Frequencies, Importances, TransactionTypes, Tags);
        }

        private void LoadDashboards(ApiUser user)
        {
            Dashboards = _apiAdapter.GetDashboards(user, Filters);
        }

        private void LoadFilters(ApiUser user)
        {
            Filters = _apiAdapter.GetFilters(user);
        }

        private void LoadSettings(ApiUser user)
        {
            Settings = _apiAdapter.GetSettings(user);
        }

        private void LoadSchematics(ApiUser user)
        {
            SchematicTypes = _apiAdapter.GetSchematicTypes();
            Schematics = _apiAdapter.GetSchematic(user, SchematicTypes);
        }

        private List<ApiOperation> Import(int bankId, List<string> lines)
        {
            var ignored = Schematics.Where(t => t.Type.Id == 1);

            var importFactory = ImportFactory.GetFactory(GetBanks(bankId).Name);
            var importer = importFactory.CreateImporter();
            var transactions = new List<Transaction>();

            transactions.AddRange(importer.ReadTransactions(lines));

            foreach (var ignoredItem in ignored)
            {
                if (ignoredItem.Context.DescriptionRegex == "")
                {
                    ignoredItem.Context.DescriptionRegex = ".*";
                }

                if (ignoredItem.Context.TitleRegex == "")
                {
                    ignoredItem.Context.TitleRegex = ".*";
                }

                transactions = transactions.Where(t => !Regex.Match(t.ContractorData, ignoredItem.Context.DescriptionRegex).Success || !Regex.Match(t.Title, ignoredItem.Context.TitleRegex).Success).ToList();
            }

            transactions.Reverse();
            var mapper = new TransactionsToApiOperationsMapper();
            mapper.setSchematics(Schematics.Where(t => t.Type.Id == 2));
            var a = mapper.ConvertToEntitiesCollection(transactions, User, Importances, Frequencies, Tags, TransactionTypes, TransferTypes).ToList();
            return a;
        }

        public void UpdateSchematic(ApiSchematic schematic)
        {
            _apiAdapter.UpdateSchematic(schematic);
        }
    }
}
