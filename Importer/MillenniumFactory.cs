using System;
using System.Collections.Generic;
using System.Text;

namespace Importer
{
    class MillenniumFactory : ImportFactory
    {
        public const string ID = "Millennium";
        public override IImporter CreateImporter()
        {
            return new MillenniumImporter();
        }
    }
}
