﻿using DataBaseWithBusinessLogicConnector.DalEntities;
using DataBaseWithBusinessLogicConnector.Interfaces.Dal;
using System.Collections.Generic;
using System.Linq;

namespace DataBaseWithBusinessLogicConnector.DbAdapters
{
    public class FrequencyAdapter : IAdapter<DalFrequency>
    {
        private const string Table = "frequencies";

        private readonly Dictionary<string, DataType> _columns = new Dictionary<string, DataType>
        {
            ["id"] = DataType.IntegerNullable,
            ["text"]= DataType.String,
            ["language_id"] = DataType.IntegerNullable,
        };

        private readonly AdapterHelper _adapterHelper;

        public FrequencyAdapter(DbConnector connector)
        {
            _adapterHelper = new AdapterHelper(connector, Table, _columns.Keys.ToList());
        }

        public void Delete(int? id)
        {
            _adapterHelper.Delete(id);
        }

        public IEnumerable<DalFrequency> GetAll(string filter = "")
        {
            var result = new List<DalFrequency>();

            var data = _adapterHelper.GetAll(filter);

            for (var i = 0; i < data.Tables[0].Rows.Count; ++i)
            {
                var dataRow = data.Tables[0].Rows[i].ItemArray;
                result.Add(new DalFrequency(int.Parse(dataRow[0].ToString()), dataRow[1].ToString(), int.Parse(dataRow[2].ToString())));
            }

            return result;
        }

        public DalFrequency GetById(int? id)
        {
            DalFrequency result = null;

            var data = _adapterHelper.GetById(id);

            if (data.Tables.Count > 0)
            {
                var dataRow = data.Tables[0].Rows[0].ItemArray;
                result = new DalFrequency(int.Parse(dataRow[0].ToString()), dataRow[1].ToString(), int.Parse(dataRow[2].ToString()));
            }

            return result;
        }

        public int Insert(DalFrequency entity)
        {
            var id = _adapterHelper.ToStr(entity.Id, _columns["id"]);
            var text = _adapterHelper.ToStr(entity.Text, _columns["text"]);
            var language = _adapterHelper.ToStr(entity.LanguageId, _columns["language_id"]);
            return _adapterHelper.Insert(id, text, language);
        }

        public void Update(DalFrequency entity)
        {
            var id = _adapterHelper.ToStr(entity.Id, _columns["id"]);
            var text = _adapterHelper.ToStr(entity.Text, _columns["text"]);
            var language = _adapterHelper.ToStr(entity.LanguageId, _columns["language_id"]);
            _adapterHelper.Update(id, text, language);
        }
    }
}
