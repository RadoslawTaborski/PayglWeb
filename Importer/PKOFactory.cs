using System;
using System.Collections.Generic;
using System.Text;

namespace Importer
{
    class PKOFactory : ImportFactory
    {
        public const string ID = "PKO";
        public override IImporter CreateImporter()
        {
            return new PKOImporter();
        }
    }
}
