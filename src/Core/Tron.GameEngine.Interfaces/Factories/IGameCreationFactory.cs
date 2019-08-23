using Tron.Entities.Games;
using Tron.GameEngine.Interfaces.Games;

namespace Tron.GameEngine.Interfaces.Factories
{
    public interface IGameCreationFactory
    {
        IGame CreateGame(GameOptions options);
    }
}
