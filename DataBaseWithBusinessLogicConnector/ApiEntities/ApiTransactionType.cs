﻿using DataBaseWithBusinessLogicConnector.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.ApiEntities
{
    public class ApiTransactionType : IEntity, IParameter
    {
        public int? Id { get;  set; }
        public bool IsDirty { get; set; }
        public bool IsMarkForDeletion { get; set; }
        public string Text { get;  set; }

        public ApiTransactionType(int? id, string text)
        {
            Id = id;
            Text = text;
        }

        public ApiTransactionType()
        {
        }
        public void UpdateId(int? id)
        {
            Id = id;
        }
    }
}
