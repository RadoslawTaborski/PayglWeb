﻿using DataBaseWithBusinessLogicConnector.DalEntities;
using DataBaseWithBusinessLogicConnector.Interfaces.Dal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.DbAdapters
{
    public class DashboardAdapter : IAdapter<DalDashboard>
    {
        private const string Table = "dashboards";

        private readonly Dictionary<string, DataType> _columns = new Dictionary<string, DataType>
        {
            ["id"] = DataType.IntegerNullable,
            ["user_id"] = DataType.IntegerNullable,
            ["name"] = DataType.String,
            ["is_visible"] = DataType.Boolean,
            ["order"] = DataType.Integer
        };

        private readonly AdapterHelper _adapterHelper;

        public DashboardAdapter(DbConnector connector)
        {
            _adapterHelper = new AdapterHelper(connector, Table, _columns.Keys.ToList());
        }

        public void Delete(int? id)
        {
            _adapterHelper.Delete(id);
        }

        public IEnumerable<DalDashboard> GetAll(string filter = "")
        {
            var result = new List<DalDashboard>();

            var data = _adapterHelper.GetAll(filter);

            for (var i = 0; i < data.Tables[0].Rows.Count; ++i)
            {
                var dataRow = data.Tables[0].Rows[i].ItemArray;
                result.Add(new DalDashboard(int.Parse(dataRow[0].ToString()), int.Parse(dataRow[1].ToString()), dataRow[2].ToString(), (bool)dataRow[3], int.Parse(dataRow[4].ToString())));
            }

            return result;
        }

        public DalDashboard GetById(int? id)
        {
            DalDashboard result = null;

            var data = _adapterHelper.GetById(id);

            if (data.Tables.Count > 0)
            {
                var dataRow = data.Tables[0].Rows[0].ItemArray;
                result = new DalDashboard(int.Parse(dataRow[0].ToString()), int.Parse(dataRow[1].ToString()), dataRow[2].ToString(), (bool)dataRow[3], int.Parse(dataRow[4].ToString()));
            }

            return result;
        }

        public int Insert(DalDashboard entity)
        {
            var id = _adapterHelper.ToStr(entity.Id, _columns["id"]);
            var userId = _adapterHelper.ToStr(entity.UserId, _columns["user_id"]);
            var name = _adapterHelper.ToStr(entity.Name, _columns["name"]);
            var isVisible = _adapterHelper.ToStr(entity.IsVisible, _columns["is_visible"]);
            var order = _adapterHelper.ToStr(entity.Order, _columns["order"]);

            return _adapterHelper.Insert(id, userId, name, isVisible, order);
        }

        public void Update(DalDashboard entity)
        {
            var id = _adapterHelper.ToStr(entity.Id, _columns["id"]);
            var userId = _adapterHelper.ToStr(entity.UserId, _columns["user_id"]);
            var name = _adapterHelper.ToStr(entity.Name, _columns["name"]);
            var isVisible = _adapterHelper.ToStr(entity.IsVisible, _columns["is_visible"]);
            var order = _adapterHelper.ToStr(entity.Order, _columns["order"]);

            _adapterHelper.Update(id, id, userId, name, isVisible, order);
        }
    }
}
