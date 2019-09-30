using DataBaseWithBusinessLogicConnector.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.ApiEntities
{
    public class ApiOperationsGroup : IEntity
    {
        public int? Id { get;  set; }
        public bool IsDirty { get; set; }
        public bool IsMarkForDeletion { get; set; }
        public ApiUser User { get;  set; }
        public string Description { get;  set; }
        public ApiFrequency Frequency { get;  set; }
        public ApiImportance Importance { get;  set; }
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
    }
}
