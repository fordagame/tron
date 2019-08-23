using System;
using System.Collections.Generic;
using System.Text;

namespace Tron.GameEngine.Interfaces.Games
{
    public interface IGameStateUpdate
    {
        GameState State { get; }
    }
}
