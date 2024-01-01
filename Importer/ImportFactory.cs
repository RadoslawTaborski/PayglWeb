using System;

namespace Importer
{
    public abstract class ImportFactory
    {
        public static ImportFactory GetFactory(string type) => type switch
        {
            IngFactory.ID => new IngFactory(),
            MillenniumFactory.ID => new MillenniumFactory(),
            PKOFactory.ID => new PKOFactory(),
            RevolutFactory.ID => new RevolutFactory(),
            AliorFactory.ID => new AliorFactory(),
            AliorCantorFactory.ID => new AliorCantorFactory(),
            IngCreditCardFactory.ID => new IngCreditCardFactory(),
            _ => throw new NotImplementedException(),
        };

        public abstract IImporter CreateImporter();
    }
}
