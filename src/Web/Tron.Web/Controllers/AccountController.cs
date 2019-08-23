using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Tron.Core.Interfaces.Services;
using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;
using Tron.Web.AppCode.Authorization;
using Tron.Entities;

namespace Tron.Web.Controllers
{
    public class AccountController : Controller
    {
        IUsersService userService;
        IStringLocalizer<AccountController> localizaer;
        public AccountController(IUsersService userService, IStringLocalizer<AccountController> localizaer)
        {
            this.userService = userService;
            this.localizaer = localizaer;
        }

        [HttpGet]
        public IActionResult LogIn()
        {
            ViewData["InsertYourName"] = localizaer.GetString("InsertYourName");
            ViewData["Welcome"] = localizaer.GetString("Welcome");
            ViewData["LogIn"] = localizaer.GetString("LogIn");
            return View();
        }

        [HttpPost]
        public IActionResult LogIn(User user)
        {
            var id = userService.LogIn(user.Name);
            HttpContext.SignInAsync("cookietronauth", new ClaimsPrincipal(new CustomClaimUser() { Name = id.ToString() }), new Microsoft.AspNetCore.Authentication.AuthenticationProperties()
            {
                IsPersistent = false
            });
            HttpContext.Response.Cookies.Append("name", user.Name);
            HttpContext.Response.Cookies.Append("id", id.ToString());
            return RedirectToAction("Index", "Home");
        }
    }
}