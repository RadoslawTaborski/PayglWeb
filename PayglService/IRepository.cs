﻿using DataBaseWithBusinessLogicConnector.ApiEntities;
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

        void UpdateOperationsGroupComplex(ApiOperationsGroup group);
        void UpdateOperationComplex(ApiOperation newOperation);

        public IEnumerable<ApiOperation> GetFilteredOperations(DateTime from, DateTime to, string query);
        public IEnumerable<ApiOperation> GetFilteredOperations(string query);
        public IEnumerable<ApiOperationsGroup> GetFilteredOperationsGroups(DateTime from, DateTime to, string query);
        public IEnumerable<ApiOperationsGroup> GetFilteredOperationsGroups(string query);
    }
}
