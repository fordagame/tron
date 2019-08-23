using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tron.Web.AppCode
{
    public interface IWebSocketHandler
    {
        Task HandleWebSockets(System.Net.WebSockets.WebSocket socket, IServiceProvider service);
    }
}
