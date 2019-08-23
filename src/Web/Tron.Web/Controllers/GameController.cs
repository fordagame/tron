using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Tron.Entities.Games;
using Tron.GameEngine.Interfaces.Services;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tron.Web.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Policy = "LoggedIn")]
    public class GameController : Controller
    {
        IGameService gameService;
        public GameController(IGameService gameService)
        {
            this.gameService = gameService;
        }

        [HttpPost("creategame")]
        public string CreateGame([FromBody] JToken json)
        {
            var options = json["options"].ToObject<GameOptions>();
            return this.gameService.CreateGame(options);
        }
    }
}
