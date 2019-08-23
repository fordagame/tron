using System;
using System.Collections.Generic;
using System.Text;
using Tron.GameEngine.Interfaces.Games;

namespace Tron.GameEngine.Interfaces.Objects
{
    public interface IPlayer
    {
        string ID { get; set; }
        string Name { get; set; }
        bool IsPlayerAlive { get; set; }
    }
}
