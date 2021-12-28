using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayglService
{
    public class DbConfiguration
    {
        public class DataBase
        {
            public string Address { get; set; }
            public string Port { get; set; }
            public string Login { get; set; }
            public string Password { get; set; }
            public string Table { get; set; }
        }

        public class Settings
        {
            public DataBase DataBase { get; set; }
        }

        public class RootObject
        {
            public Settings Settings { get; set; }
        }
    }
}
