using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Text;
using Tron.Entities.Games;
using Tron.GameEngine.Interfaces.Factories;
using Tron.GameEngine.Interfaces.Games;
using Tron.GameEngine.Interfaces.Objects;
using Tron.GameEngine.Tron;

namespace Tron.GameEngine.Factories
{
    public class GameCreationFactory : IGameCreationFactory
    {
        GameEngineSettings settings;
        ILoggerFactory logger;
        public GameCreationFactory(IOptions<GameEngineSettings> settings, ILoggerFactory logger)
        {
            this.settings = settings.Value;
            this.logger = logger;
        }
        public IGame CreateGame(GameOptions options)
        {
            switch (options.Type)
            {
                case GameType.Tron:
                    return new TronGame(settings, options, this.logger);
            }
            return null;
        }
    }
}
