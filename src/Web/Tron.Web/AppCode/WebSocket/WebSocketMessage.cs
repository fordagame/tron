using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace Tron.Web.AppCode
{
    [DataContract]
    public class WebSocketMessage
    {
        [DataMember(Name = "type")]
        public string Type { get; set; }
        [DataMember(Name = "data")]
        public object Data { get; set; }
    }
}
