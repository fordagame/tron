using System.Runtime.Serialization;
using Tron.GameEngine.Interfaces.Games;

namespace Tron.GameEngine.Tron
{
    [DataContract]
    public class TronGameDataForPlayer: IGameDataForPlayer
    {
        [DataMember(Name ="id")]
        public string PlayerID { get; set; }
        [DataMember(Name = "boardx")]
        public int BoardSizeX { get; set; }
        [DataMember(Name = "boardy")]
        public int BoardSizeY { get; set; }
        [DataMember(Name = "numberOfPlayers")]
        public int NumberOfPlayers { get; set; }
        [DataMember(Name = "state")]
        public AddPlayerState PlayerState { get; set; }
    }
}
