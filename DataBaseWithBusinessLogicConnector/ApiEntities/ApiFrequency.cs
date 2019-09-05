using DataBaseWithBusinessLogicConnector.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataBaseWithBusinessLogicConnector.ApiEntities
{
    public class ApiFrequency : IEntity
    {
        public int? Id { get; set; }
        public bool IsDirty { get; set; }
        public string Text { get; set; }

        public ApiFrequency(int? id, string text)
        {
            Id = id;
            Text = text;
        }

        public ApiFrequency()
        {
        }

        public void UpdateId(int? id)
        {
            Id = id;
        }
    }
}
