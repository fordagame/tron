using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace Tron.Entities.Games
{
    public enum GameType
    {
        Tron = 1
    }
    [DataContract]
    public class GameOptions
    {
        public GameOptions()
        {
        }

        [DataMember(Name = "type")]
        public GameType Type { get; set; }
        [DataMember(Name = "numberOfPlayers")]
        public int NumberOfPlayers { get; set; }
    }
}
