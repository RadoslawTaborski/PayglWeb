using DataBaseWithBusinessLogicConnector.ApiEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.Interfaces.Api
{
    public interface IApiOperation
    {
        ApiFrequency Frequency { get; }
        ApiImportance Importance { get; }
        string Date { get; }
        ApiRelTag[] Tags { get; }
        string Description { get; }
    }
}
