using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.ApiEntities
{
    public class ApiImportance
    {
        public int? Id { get; set; }
        public string Text { get; set; }

        public ApiImportance(int? id, string text)
        {
            Id = id;
            Text = text;
        }

        public ApiImportance()
        {
        }
    }
}
