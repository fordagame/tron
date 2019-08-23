using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace Tron.GameEngine.Tron
{
    [DataContract]
    public class TronCoordinate
    {
        [DataMember(Name = "x")]
        public int X { get; set; }
        [DataMember(Name = "y")]
        public int Y { get; set; }
        [DataMember(Name = "id")]
        public string PlayerID { get; set; }
    }
}
