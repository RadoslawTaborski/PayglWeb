namespace DataBaseWithBusinessLogicConnector.ApiEntities
{
    public class SchematicContext
    {
        public string DescriptionRegex { get; set; }
        public string TitleRegex { get; set; }
        public string Description { get; set; }
        public string Frequency { get; set; }
        public string Importance { get; set; }
        public string[] Tags { get; set; }

        public SchematicContext() { }

        public SchematicContext(string descriptionRegex, string titleRegex, string description, string frequency, string importance, string[] tags)
        {
            DescriptionRegex = descriptionRegex;
            TitleRegex = titleRegex;
            Description = description;
            Frequency = frequency;
            Importance = importance;
            Tags = tags;
        }
    }
}