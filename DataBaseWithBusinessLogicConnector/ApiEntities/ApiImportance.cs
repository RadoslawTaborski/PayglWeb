using DataBaseWithBusinessLogicConnector.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.ApiEntities
{
    public class ApiImportance : IEntity, IParameter
    {
        public int? Id { get; set; }
        public bool IsDirty { get; set; }
        public bool IsMarkForDeletion { get; set; }
        public string Text { get; set; }

        public ApiImportance(int? id, string text)
        {
            Id = id;
            Text = text;
        }

        public ApiImportance()
        {
        }

        public void UpdateId(int? id)
        {
            Id = id;
        }
    }
}
