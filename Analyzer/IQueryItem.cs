using DataBaseWithBusinessLogicConnector.Interfaces.Api;
using System.Collections.Generic;

namespace Analyzer
{
    public interface IQueryItem
    {
        List<IApiOperation> Result { get; }
        bool OnlyOperations { get; }
        void Filter(List<IApiOperation> all);
    }
}