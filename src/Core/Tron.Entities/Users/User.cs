using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace Tron.Entities
{
    [DataContract]
    public class User
    {
        public User()
        {
        }

        [DataMember(Name = "name")]
        public string Name { get; set; }
    }
}
