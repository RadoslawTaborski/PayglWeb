﻿using System;
using System.Collections.Generic;
using System.Text;

namespace DataBaseWithBusinessLogicConnector.ApiEntities
{
    public class ApiRelTag
    {
        public int? Id { get; set; }
        public bool IsDirty { get; set; }
        public ApiTag Tag { get; set; }

        public ApiRelTag(int? id, ApiTag tag)
        {
            Id = id;
            Tag = tag;
        }

        public ApiRelTag()
        {
        }

        public void UpdateId(int? id)
        {
            Id = id;
        }
    }
}
