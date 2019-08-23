using Tron.GameEngine.Interfaces.Games;

namespace Tron.GameEngine.Interfaces.Objects
{
    public delegate void GameStateUpdated(string gameId, IGameStateUpdate state);
}
