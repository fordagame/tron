using Microsoft.Extensions.Options;
using System;
using System.Collections.Concurrent;
using Tron.Entities;
using Tron.Entities.Games;
using Tron.GameEngine.Interfaces.Factories;
using Tron.GameEngine.Interfaces.Games;
using Tron.GameEngine.Interfaces.Objects;
using Tron.GameEngine.Interfaces.Services;

namespace Tron.GameEngine
{
    public class GameService : IGameService, IDisposable
    {
        private GameEngineSettings settings;
        private ConcurrentDictionary<string, IGame> games;
        private IGameCreationFactory gameCreationFactory;

        public event GameStateUpdated OnGameStateUpdated;

        public GameService(IOptions<GameEngineSettings> settings, IGameCreationFactory gameCreationFactory)
        {
            this.settings = settings.Value;
            this.games = new ConcurrentDictionary<string, IGame>();
            this.gameCreationFactory = gameCreationFactory;
        }

        public string CreateGame(GameOptions options)
        {
            var game = this.gameCreationFactory.CreateGame(options);
            if (games.TryAdd(game.ID, game))
            {
                game.Start();
                game.OnGameStateUpdated += this.GameHasUpdated;
                return game.ID;
            }
            else
            {
                return null;
            }
        }

        public void Dispose()
        {
            foreach (var game in games)
            {
                game.Value.Stop();
            }
        }

        public IGameDataForPlayer AddPlayer(string gameId, string player)
        {
            IGame game;
            if (games.TryGetValue(gameId, out game))
            {
                return game.AddPlayer(player);
            }
            return null;
        }

        public bool RemovePlayer(string gameId, string playerId)
        {
            IGame game;
            if (games.TryGetValue(gameId, out game))
            {
                return game.RemovePlayer(playerId);
            }
            return false;
        }

        public void UpdatePlayerState(string gameId, string playerId, IPlayerGameStateUpdate state)
        {
            IGame game;
            if (games.TryGetValue(gameId, out game))
            {
                game.UpdatePlayerState(playerId, state);
            }
        }

        private void GameHasUpdated(string gameId, IGameStateUpdate state)
        {
            if (this.OnGameStateUpdated != null)
            {
                if (state.State == GameState.Ended)
                {
                    IGame game;
                    if (games.TryGetValue(gameId, out game))
                    {
                        game.Stop();
                        games.TryRemove(gameId, out game);
                    }
                }
                this.OnGameStateUpdated(gameId, state);
            }
        }
    }
}
