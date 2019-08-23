using Tron.Core.Interfaces.Services;

namespace Tron.Core.Services
{
    public class UserService : IUsersService
    {
        private static int IDCounter = 1;
        public int LogIn(string userName)
        {
            return UserService.IDCounter++;
        }
    }
}
