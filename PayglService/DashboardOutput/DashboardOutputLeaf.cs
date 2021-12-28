using DataBaseWithBusinessLogicConnector.Interfaces;
using DataBaseWithBusinessLogicConnector.Interfaces.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayglService.DashboardOutputElements
{
    public class DashboardOutputLeaf : IDashboardOutput
    {
        public string Name { get; set; }
        public List<IApiOperation> Result { get; set; }

        public DashboardOutputLeaf()
        {
            Result = new List<IApiOperation>();
        }
    }
}
