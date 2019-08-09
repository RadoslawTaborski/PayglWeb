﻿using System;
using System.Collections.Generic;
using System.Text;

namespace DataBaseWithBusinessLogicConnector.ApiEntities
{
    public class ApiOperationDetails
    {
        public int? Id { get;  set; }
        public string Name { get;  set; }
        public double Quantity { get;  set; }
        public decimal Amount { get;  set; }

        public ApiOperationDetails(int? id, string name, double quantity, decimal amount)
        {
            Id = id;
            Name = name;
            Quantity = quantity;
            Amount = amount;
        }

        public ApiOperationDetails()
        {
        }
    }
}