using System.Runtime.Serialization;
using Tron.GameEngine.Interfaces.Objects;

namespace Tron.GameEngine.Tron
{
    public enum TronGameDirection
    {
        Up = 1,
        Right = 2,
        Down = 3,
        Left = 4
    }

    [DataContract]
    public class TronPlayer : IPlayer
    {
        [DataMember(Name="id")]
        public string ID { get; set; }
        [DataMember(Name = "name")]
        public string Name { get; set; }
        [DataMember(Name = "direction")]
        public TronGameDirection CurrentDirection { get; set; }
        [DataMember(Name = "x")]
        public int CurrentPositionX { get; set; }
        [DataMember(Name = "y")]
        public int CurrentPositionY { get; set; }
        [DataMember(Name = "alive")]
        public bool IsPlayerAlive { get; set; }
        [DataMember(Name = "position")]
        public int PlayerPosition { get; set; }
    }
}
