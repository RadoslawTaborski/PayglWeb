﻿using DataBaseWithBusinessLogicConnector.Interfaces;
using System.Collections.Generic;

namespace Analyzer
{
    public interface IQueryItem
    {
        List<IOperation> Result { get; }
        bool OnlyOperations { get; }
        void Filter(List<IOperation> all);
    }
}