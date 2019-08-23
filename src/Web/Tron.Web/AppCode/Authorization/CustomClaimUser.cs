using System.Security.Principal;

namespace Tron.Web.AppCode.Authorization
{
    public class CustomClaimUser : IIdentity
    {
        public string AuthenticationType
        {
            get { return ""; }
        }

        public bool IsAuthenticated
        {
            get
            {
                return Name != "";
            }
        }

        public string Name { get; set; }
    }
}
