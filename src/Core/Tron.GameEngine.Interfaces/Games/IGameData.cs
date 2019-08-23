using System;
using System.Collections.Generic;
using System.Text;

namespace Tron.GameEngine.Interfaces.Games
{
    public enum AddPlayerState
    {
        PlayerAdded = 1,
        GameIsFull = 2
    }
    public interface IGameDataForPlayer
    {
        string PlayerID { get; set; }
        AddPlayerState PlayerState { get; set; }
    }
}
