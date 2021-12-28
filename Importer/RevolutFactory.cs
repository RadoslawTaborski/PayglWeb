using System;
using System.Collections.Generic;
using System.Text;

namespace Importer
{
    class RevolutFactory : ImportFactory
    {
        public const string ID = "Revolut";
        public override IImporter CreateImporter()
        {
            return new RevolutImporter();
        }
    }
}
