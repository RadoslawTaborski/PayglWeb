using DataBaseWithBusinessLogicConnector.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.ApiEntities
{
    public class ApiOperation : IEntity
    {
        public int? Id { get;  set; }
        public bool IsDirty { get; set; }
        public bool IsMarkForDeletion { get; set; }
        public int? GroupId { get;  set; }
        public ApiUser User { get;  set; }
        public decimal Amount { get;  set; }
        public ApiTransactionType TransactionType { get;  set; }
        public ApiTransferType TransferType { get;  set; }
        public ApiFrequency Frequency { get;  set; }
        public ApiImportance Importance { get;  set; }
        public string Date { get;  set; }
        public string ReceiptPath { get;  set; }
        public ApiRelTag[] Tags { get;  set; }
        public ApiOperationDetails[] DetailsList { get;  set; }
        public string Description { get;  set; }

        public ApiOperation() {}
        public ApiOperation(int? id, int? groupId, ApiUser user, decimal amount, ApiTransactionType transactionType, ApiTransferType transferType, ApiFrequency frequency, ApiImportance importance, string date, string receiptPath, ApiRelTag[] tags, ApiOperationDetails[] detailsList, string description)
        {
            Id = id;
            GroupId = groupId;
            User = user;
            Amount = amount;
            TransactionType = transactionType;
            TransferType = transferType;
            Frequency = frequency;
            Importance = importance;
            Date = date;
            ReceiptPath = receiptPath;
            Tags = tags;
            DetailsList = detailsList;
            Description = description;
        }
        public void UpdateId(int? id)
        {
            Id = id;
        }
    }
}
