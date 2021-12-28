using System;

namespace Importer
{
    public abstract class ImportFactory
    {
        public static ImportFactory GetFactory(string type)
        {
            return type switch
            {
                IngFactory.ID => new IngFactory(),
                MillenniumFactory.ID => new MillenniumFactory(),
                RevolutFactory.ID => new RevolutFactory(),
                _ => throw new NotImplementedException(),
            };
        }

        public abstract IImporter CreateImporter();
    }
}
