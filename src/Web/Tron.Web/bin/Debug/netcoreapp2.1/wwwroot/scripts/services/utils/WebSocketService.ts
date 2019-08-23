namespace Tron {
    export class WebSocketService {
        app: DCore;
        private static subscribers: List<any>[];
        constructor(app: DCore) {
            this.app = app;
            this.app.subscribe(["WebSocketDataReceived"], this.onWebSocketMessage.bind(this));
            if (!WebSocketService.subscribers) {
                WebSocketService.subscribers = [];
            }
        }

        onWebSocketMessage(topic: string, data: any) {
            let json: any = JSON.parse(data.data);
            let socketMessage = new WebSocketMessage();
            socketMessage.deserialize(json);
            if (WebSocketService.subscribers[socketMessage.type]) {
                for (var i = 0; i < WebSocketService.subscribers[socketMessage.type].objects.length; i++) {
                    WebSocketService.subscribers[socketMessage.type].objects[i](socketMessage);
                }
            }
        }

        addPlayer(gameId: string, name: string): void {
            this.app.websocket.send(JSON.stringify({
                "MessageType": "addPlayer",
                "gameId": gameId,
                "name": name
            }));
        }

        updateGameState(gameId: string, direction: number): void {
            this.app.websocket.send(JSON.stringify({
                "MessageType": "tronDirectionUpdate",
                "gameId": gameId,
                "direction": direction
            }));
        }

        subscribeForMessage(type: string, handler: (socketMessage: WebSocketMessage) => void) {
            if (!WebSocketService.subscribers[type]) {
                WebSocketService.subscribers[type] = new List<any>();
            }
            WebSocketService.subscribers[type].push(handler);
        }

        unsubscribeForMessage(type: string, handler: (socketMessage: WebSocketMessage) => void) {
            if (WebSocketService.subscribers[type]) {
                for (var i = 0; i < WebSocketService.subscribers[type].objects.length; i++) {
                    if (WebSocketService.subscribers[type].objects[i] == handler) {
                        WebSocketService.subscribers[type].objects.splice(i, 1);
                    }
                }
            }
        }
    }
}