using Microsoft.AspNetCore.Mvc;

namespace Tron.Web.AppCode
{
    public class BaseController : Controller
    {
        protected int CurrentUserID
        {
            get
            {
                var userId = HttpContext.User.Identity.Name;
                if (userId == "")
                {
                    return 0;
                }
                else
                {
                    return int.Parse(userId);
                }
            }
        }
    }
}
