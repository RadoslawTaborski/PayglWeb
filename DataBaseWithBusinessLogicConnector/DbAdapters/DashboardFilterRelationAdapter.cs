using DataBaseWithBusinessLogicConnector.DalEntities;
using DataBaseWithBusinessLogicConnector.Interfaces.Dal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.DbAdapters
{
    public class DashboardFilterRelationAdapter : IAdapter<DalDashboardFilterRelation>
    {
        private const string Table = "filters_dashboards_relations";

        private readonly Dictionary<string, DataType> _columns = new Dictionary<string, DataType>
        {
            ["id"] = DataType.IntegerNullable,
            ["dashboard_id"] = DataType.IntegerNullable,
            ["filter_target_id"] = DataType.IntegerNullable,
            ["dashboard_target_id"] = DataType.IntegerNullable,
            ["is_visible"] = DataType.Boolean,
            ["next_id"] = DataType.IntegerNullable,
        };

        private readonly AdapterHelper _adapterHelper;

        public DashboardFilterRelationAdapter(DbConnector connector)
        {
            _adapterHelper = new AdapterHelper(connector, Table, _columns.Keys.ToList());
        }

        public void Delete(int? id)
        {
            _adapterHelper.Delete(id);
        }

        public IEnumerable<DalDashboardFilterRelation> GetAll(string filter = "")
        {
            var result = new List<DalDashboardFilterRelation>();

            var data = _adapterHelper.GetAll(filter);

            for (var i = 0; i < data.Tables[0].Rows.Count; ++i)
            {
                var dataRow = data.Tables[0].Rows[i].ItemArray;
                result.Add(new DalDashboardFilterRelation(int.Parse(dataRow[0].ToString()), int.Parse(dataRow[1].ToString()), dataRow[2] != DBNull.Value ? int.Parse(dataRow[2].ToString()) : (int?)null, dataRow[3] != DBNull.Value ? int.Parse(dataRow[3].ToString()) : (int?)null, (bool)dataRow[4], dataRow[5] != DBNull.Value ? int.Parse(dataRow[5].ToString()) : (int?)null));
            }

            return result;
        }

        public DalDashboardFilterRelation GetById(int? id)
        {
            DalDashboardFilterRelation result = null;

            var data = _adapterHelper.GetById(id);

            if (data.Tables.Count > 0)
            {
                var dataRow = data.Tables[0].Rows[0].ItemArray;
                result = new DalDashboardFilterRelation(int.Parse(dataRow[0].ToString()), int.Parse(dataRow[1].ToString()), dataRow[2] != DBNull.Value ? int.Parse(dataRow[2].ToString()) : (int?)null, dataRow[3] != DBNull.Value ? int.Parse(dataRow[3].ToString()) : (int?)null, (bool)dataRow[4], dataRow[5] != DBNull.Value ? int.Parse(dataRow[5].ToString()) : (int?)null);
            }

            return result;
        }

        public int Insert(DalDashboardFilterRelation entity)
        {
            var id = _adapterHelper.ToStr(entity.Id, _columns["id"]);
            var dashboardId = _adapterHelper.ToStr(entity.DashboardId, _columns["dashboard_id"]);
            var filterTargetId = _adapterHelper.ToStr(entity.FilterTargetId, _columns["filter_target_id"]);
            var dashboardTargetId = _adapterHelper.ToStr(entity.DashboardTargetId, _columns["dashboard_target_id"]);
            var isVisible = _adapterHelper.ToStr(entity.IsVisible, _columns["is_visible"]);
            var nextId = _adapterHelper.ToStr(entity.NextDashboardId, _columns["next_id"]);

            return _adapterHelper.Insert(id, dashboardId, filterTargetId, dashboardTargetId, isVisible, nextId);
        }

        public void Update(DalDashboardFilterRelation entity)
        {
            var id = _adapterHelper.ToStr(entity.Id, _columns["id"]);
            var dashboardId = _adapterHelper.ToStr(entity.DashboardId, _columns["dashboard_id"]);
            var filterTargetId = _adapterHelper.ToStr(entity.FilterTargetId, _columns["filter_target_id"]);
            var dashboardTargetId = _adapterHelper.ToStr(entity.DashboardTargetId, _columns["dashboard_target_id"]);
            var isVisible = _adapterHelper.ToStr(entity.IsVisible, _columns["is_visible"]);
            var nextId = _adapterHelper.ToStr(entity.NextDashboardId, _columns["next_id"]);

            _adapterHelper.Update(id, dashboardId, filterTargetId, dashboardTargetId, isVisible, nextId);
        }
    }
}
