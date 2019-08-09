using System;
using System.Collections.Generic;
using System.Text;

namespace DataBaseWithBusinessLogicConnector.ApiEntities
{
    public class ApiFrequency
    {
        public int? Id { get; set; }
        public string Text { get; set; }

        public ApiFrequency(int? id, string text)
        {
            Id = id;
            Text = text;
        }

        public ApiFrequency()
        {
        }
    }
}
