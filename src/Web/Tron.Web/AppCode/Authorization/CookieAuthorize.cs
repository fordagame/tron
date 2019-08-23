using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;

namespace Tron.Web.AppCode
{
    public class CookieAuthorize : IAuthorizationRequirement
    {
    }

    public class CookieAuthorizeHandler : AuthorizationHandler<CookieAuthorize>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, CookieAuthorize requirement)
        {
            if (!string.IsNullOrEmpty(context?.User?.Identity?.Name))
            {
                context.Succeed(requirement);
            }
            return Task.CompletedTask;
        }
    }
}
