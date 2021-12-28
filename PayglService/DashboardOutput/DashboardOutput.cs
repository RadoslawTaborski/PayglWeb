using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayglService.DashboardOutputElements
{ 
    public class DashboardOutput : IDashboardOutput
    {
        public string Name { get; set; }
        public List<IDashboardOutput> Children { get; set; }

        public DashboardOutput()
        {
            Children = new List<IDashboardOutput>();
        }
    }
}
