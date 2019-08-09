using DataBaseWithBusinessLogicConnector.Interfaces;

namespace DataBaseWithBusinessLogicConnector.Entities
{
    public class User : IEntity
    {
        public int? Id { get; private set; }
        public string Login { get; private set; }
        public Language Language { get; private set; }
        public UserDetails Details { get; private set; }

        public User(int? id, string login, Language language, UserDetails details)
        {
            Id = id;
            Login = login;
            Details = details;
            Language = language;
        }

        public void SetDetails(UserDetails userDetails)
        {
            Details = userDetails;
        }

        public void UpdateId(int? id)
        {
            Id = id;
        }
    }
}
