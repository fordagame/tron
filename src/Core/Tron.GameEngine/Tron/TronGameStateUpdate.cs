using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;
using Tron.GameEngine.Interfaces.Games;
using Tron.GameEngine.Interfaces.Objects;

namespace Tron.GameEngine.Tron
{

    [DataContract]
    public class TronGameStateUpdate : IGameStateUpdate
    {
        [DataMember(Name ="players")]
        public List<IPlayer> Players { get; set; }
        [DataMember(Name = "newCoordinates")]
        public List<TronCoordinate> NewCoordinates { get; set; }
        [DataMember(Name = "lastCoordinates")]
        public List<TronCoordinate> LastCoordinates { get; set; }
        [DataMember(Name = "winnerName")]
        public string WinnerName { get; set; }
        [DataMember(Name = "state")]
        public GameState State { get; set; }
    }
}
