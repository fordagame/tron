using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Tron.GameEngine;
using Tron.GameEngine.Interfaces.Games;
using Tron.GameEngine.Interfaces.Services;
using Tron.GameEngine.Tron;

namespace Tron.Web.AppCode
{
    public class WebSocketHandler : IWebSocketHandler
    {
        ILoggerFactory loggerFactory;
        ILogger logger;
        ILogger clientLogger;
        string gameId = "";
        string playerId = "";
        WebSocket socket;
        public WebSocketHandler(ILoggerFactory loggerFactory)
        {
            this.loggerFactory = loggerFactory;
            logger = loggerFactory.CreateLogger("websocket");
            clientLogger = loggerFactory.CreateLogger("clientside");
        }

        public async Task HandleWebSockets(System.Net.WebSockets.WebSocket socket, IServiceProvider service)
        {
            this.socket = socket;
            try
            {
                IGameService gameService = (IGameService)service.GetService(typeof(IGameService));
                while (this.socket.State == WebSocketState.Open)
                {
                    var token = CancellationToken.None;
                    var buffer = new ArraySegment<Byte>(new Byte[4096]);
                    var received = await this.socket.ReceiveAsync(buffer, token);
                    switch (received.MessageType)
                    {
                        case WebSocketMessageType.Text:
                            var request = Encoding.UTF8.GetString(buffer.Array,
                                buffer.Offset,
                                buffer.Count);
                            var parsedRequest = JToken.Parse(request);
                            switch (parsedRequest["MessageType"].Value<string>())
                            {
                                case "addPlayer":
                                    this.gameId = parsedRequest["gameId"].Value<string>();
                                    var playerData = gameService.AddPlayer(this.gameId, parsedRequest["name"].Value<string>());
                                    this.playerId = playerData?.PlayerID;
                                    gameService.OnGameStateUpdated += GameService_OnGameStateUpdated;
                                    this.SendMessage(playerData, "PlayerData");
                                    break;
                                case "tronDirectionUpdate":
                                    int direction = parsedRequest["direction"].Value<int>();
                                    var tronStateUpdate = new TronPlayerStateUpdate();
                                    tronStateUpdate.PlayerID = this.playerId;
                                    tronStateUpdate.Direction = (TronGameDirection)direction;
                                    gameService.UpdatePlayerState(parsedRequest["gameId"].Value<string>(), this.playerId, tronStateUpdate);
                                    break;
                            }
                            break;
                        case WebSocketMessageType.Close:
                            await this.socket.CloseAsync(WebSocketCloseStatus.NormalClosure, "", CancellationToken.None);
                            break;
                    }
                }
            }
            catch (Exception ex)
            {
                logger.LogError(new EventId(0), ex, $"Websocket error");
            }
        }

        private void GameService_OnGameStateUpdated(string gameId, GameEngine.Interfaces.Games.IGameStateUpdate state)
        {
            if (gameId == this.gameId)
            {

                this.SendMessage(state, "GameUpdate");
            }
        }

        private void SendMessage(object message, string type)
        {
            WebSocketMessage wsmessage = new WebSocketMessage();
            wsmessage.Type = type;
            wsmessage.Data = message;
            string json = JsonConvert.SerializeObject(wsmessage, new JsonSerializerSettings() { DateTimeZoneHandling = DateTimeZoneHandling.Utc });
            var bytes = Encoding.UTF8.GetBytes(json);
            ArraySegment<byte> buffer = new ArraySegment<byte>(new byte[1024]);
            buffer = new ArraySegment<byte>(bytes);
            this.socket.SendAsync(buffer, WebSocketMessageType.Text, true, CancellationToken.None);
        }
    }
}
