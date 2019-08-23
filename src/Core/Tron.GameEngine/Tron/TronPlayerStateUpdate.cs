using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;
using Tron.GameEngine.Interfaces.Games;

namespace Tron.GameEngine.Tron
{
    [DataContract]
    public class TronPlayerStateUpdate : IPlayerGameStateUpdate
    {
        [DataMember(Name ="direction")]
        public TronGameDirection Direction { get; set; }
        [DataMember(Name = "id")]
        public string PlayerID { get; set; }
    }
}
