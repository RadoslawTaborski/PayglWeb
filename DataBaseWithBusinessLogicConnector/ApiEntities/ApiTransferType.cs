using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.ApiEntities
{
    public class ApiTransferType
    {
        public int? Id { get;  set; }
        public string Text { get;  set; }

        public ApiTransferType(int? id, string text)
        {
            Id = id;
            Text = text;
        }

        public ApiTransferType()
        {
        }
    }
}
