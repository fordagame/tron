using System;
using Tron.Entities;
using Tron.GameEngine.Interfaces.Objects;

namespace Tron.GameEngine.Interfaces.Games
{
    public enum GameState
    {
        WaitingForPlayers = 1,
        Started = 2,
        Ended = 3
    }
    public interface IGame
    {
        string ID { get; }
        GameState State { get; }
        void Start();
        void Stop();
        bool HasGameEnded();
        void UpdatePlayerState(string playerId, IPlayerGameStateUpdate state);
        IGameDataForPlayer AddPlayer(string player);
        bool RemovePlayer(string playerId);
        event GameStateUpdated OnGameStateUpdated;
    }
}
