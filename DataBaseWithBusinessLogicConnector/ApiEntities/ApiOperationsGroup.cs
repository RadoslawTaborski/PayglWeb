using DataBaseWithBusinessLogicConnector.Interfaces;
using DataBaseWithBusinessLogicConnector.Interfaces.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DataBaseWithBusinessLogicConnector.Properties;

namespace DataBaseWithBusinessLogicConnector.ApiEntities
{
    public class ApiOperationsGroup : IEntity, IApiOperation
    {
        public int? Id { get;  set; }
        public bool IsDirty { get; set; }
        public bool IsMarkForDeletion { get; set; }
        public ApiUser User { get;  set; }
        public string Description { get;  set; }
        public ApiFrequency Frequency { get;  set; }
        public ApiImportance Importance { get;  set; }
        public ApiTransactionType TransactionType { get; private set; }
        public string Date { get;  set; }
        public ApiRelTag[] Tags { get;  set; }
        public ApiOperation[] Operations { get;  set; }

        public ApiOperationsGroup(int? id, ApiUser user, string description, ApiFrequency frequency, ApiImportance importance, string date, ApiRelTag[] tags, ApiOperation[] operations)
        {
            Id = id;
            User = user;
            Description = description;
            Frequency = frequency;
            Importance = importance;
            Date = date;
            Tags = tags;
            Operations = operations;
        }

        public ApiOperationsGroup()
        {
        }

        public void UpdateId(int? id)
        {
            Id = id;
        }

        public DateTime GetDate()
        {
            DateTime.TryParse(Date, out DateTime date);
            return date.Date;
        }

        public void UpdateAmount(List<ApiTransactionType> types)
        {
            var amount = decimal.Zero;
            foreach (var item in Operations)
            {
                if (item.TransactionType.Text == Properties.strings.income)
                {
                    amount += item.Amount;
                }
                else
                {
                    amount -= item.Amount;
                }
            }
            if (amount < 0)
            {
                TransactionType = types.First(t => t.Text == strings.expense);
                amount = Math.Abs(amount);
            }
            else
            {
                TransactionType = types.First(t => t.Text == strings.income);
            }
        }
    }
}
