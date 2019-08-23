using System;
using System.Collections.Generic;
using System.Text;
using Tron.Entities;
using Tron.Entities.Games;
using Tron.GameEngine.Interfaces.Games;
using Tron.GameEngine.Interfaces.Objects;

namespace Tron.GameEngine.Interfaces.Services
{
    public interface IGameService
    {
        string CreateGame(GameOptions options);
        IGameDataForPlayer AddPlayer(string gameId, string player);
        bool RemovePlayer(string gameId, string playerId);
        void UpdatePlayerState(string gameId, string playerId, IPlayerGameStateUpdate state);
        event GameStateUpdated OnGameStateUpdated;
    }
}
