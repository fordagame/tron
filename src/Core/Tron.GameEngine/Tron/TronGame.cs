using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using Tron.Entities;
using Tron.Entities.Games;
using Tron.GameEngine.Interfaces.Games;
using Tron.GameEngine.Interfaces.Objects;

namespace Tron.GameEngine.Tron
{
    public class TronGame : IGame
    {
        private GameEngineSettings settings;
        private Thread workerThread;
        private bool isWorking;
        private ILogger logger;
        private List<IPlayer> players;
        private GameOptions options;
        private byte[,] board;
        private string _ID;
        public string ID
        {
            get
            {
                return _ID;
            }
        }

        public GameState State { get; private set; }

        public TronGame(GameEngineSettings settings, GameOptions options, ILoggerFactory loggerFactory)
        {
            _ID = Guid.NewGuid().ToString().Replace("-", "");
            this.settings = settings;
            this.isWorking = false;
            this.logger = loggerFactory.CreateLogger("TronGame");
            this.options = options;
            this.board = new byte[settings.TronBoardSizeY, settings.TronBoardSizeX];
            this.players = new List<IPlayer>();
        }

        public event GameStateUpdated OnGameStateUpdated;

        public IGameDataForPlayer AddPlayer(string player)
        {
            TronGameDataForPlayer data = new TronGameDataForPlayer();
            if (players.Count < this.options.NumberOfPlayers)
            {
                TronPlayer tronPlayer = new TronPlayer();
                tronPlayer.Name = player;
                tronPlayer.ID = Guid.NewGuid().ToString().Replace("-", "");
                tronPlayer.IsPlayerAlive = true;
                this.players.Add(tronPlayer);
                data.PlayerID = tronPlayer.ID;
                data.BoardSizeX = this.settings.TronBoardSizeX;
                data.BoardSizeY = this.settings.TronBoardSizeY;
                data.NumberOfPlayers = this.options.NumberOfPlayers;
                data.PlayerState = AddPlayerState.PlayerAdded;
                return data;
            }
            data.PlayerState = AddPlayerState.GameIsFull;
            return data;
        }

        public bool HasGameEnded()
        {
            return this.players.Count(item => item.IsPlayerAlive) <= 1;
        }

        public bool RemovePlayer(string playerId)
        {
            if ((int)this.State > 1)
            {
                return this.players.RemoveAll(item => item.ID == playerId) > 0;
            }
            else
            {
                return false;
            }
        }

        public void Start()
        {
            this.isWorking = true;
            this.State = GameState.WaitingForPlayers;
            this.workerThread = new Thread(this.DoWorkLoop);
            this.workerThread.Start();
        }

        private void DoWorkLoop()
        {
            try
            {
                while (this.isWorking)
                {
                    this.UpdateGameState();
                    Thread.Sleep(this.settings.TronGameUpdateInterval);
                }
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
            }
            if (this.isWorking)
            {
                Thread.Sleep(this.settings.TronGameUpdateInterval);
                DoWorkLoop();
            }
        }

        private void UpdateGameState()
        {
            TronGameStateUpdate update = new TronGameStateUpdate();
            update.State = this.State;
            update.Players = this.players;
            switch (this.State)
            {
                case GameState.WaitingForPlayers:
                    if (this.players.Count == this.options.NumberOfPlayers)
                    {
                        this.AssignEachPlayerStartingPosition();
                        this.UpdateBoard();
                        update.NewCoordinates = this.GetPlayerCoordinates();
                        this.State = GameState.Started;
                    }
                    break;
                case GameState.Started:
                    update.LastCoordinates = this.GetPlayerCoordinates();
                    this.MovePlayers();
                    update.NewCoordinates = this.GetPlayerCoordinates();
                    this.UpdateBoard();
                    if (this.HasGameEnded())
                    {
                       this.State = GameState.Ended;
                    }
                    break;
                case GameState.Ended:
                    update.WinnerName = this.GetWinnerName();
                    this.OnGameStateUpdated(this._ID, update);
                    this.Stop();
                    break;
            }
            if(this.OnGameStateUpdated != null)
            {
                this.OnGameStateUpdated(this._ID, update);
            }
        }

        private void MovePlayers()
        {
            foreach (TronPlayer player in this.players)
            {
                if (player.IsPlayerAlive)
                {
                    switch (player.CurrentDirection)
                    {
                        case TronGameDirection.Up:
                            player.CurrentPositionY--;
                            break;
                        case TronGameDirection.Right:
                            player.CurrentPositionX++;
                            break;
                        case TronGameDirection.Left:
                            player.CurrentPositionX--;
                            break;
                        case TronGameDirection.Down:
                            player.CurrentPositionY++;
                            break;
                    }
                    if (this.HasPlayerHitAWall(player))
                    {
                        player.IsPlayerAlive = false;
                    }
                }
            }
        }

        private List<TronCoordinate> GetPlayerCoordinates()
        {
            List<TronCoordinate> result = new List<TronCoordinate>();
            foreach (TronPlayer player in this.players)
            {
                TronCoordinate coordinate = new TronCoordinate();
                coordinate.X = player.CurrentPositionX;
                coordinate.Y = player.CurrentPositionY;
                coordinate.PlayerID = player.ID;
                result.Add(coordinate);
            }
            return result;
        }

        private void  UpdateBoard()
        {
            foreach (TronPlayer player in this.players)
            {
                if (player.IsPlayerAlive)
                {
                    this.board[player.CurrentPositionY, player.CurrentPositionX] = 1;
                }
            }
        }

        public void Stop()
        {
            this.isWorking = false;
            this.workerThread = null;
        }

        public void UpdatePlayerState(string playerId, IPlayerGameStateUpdate state)
        {
            TronPlayer player = (TronPlayer)this.players.FirstOrDefault(item => item.ID == playerId);
            if (player != null)
            {
                if (this.ValidateDirection(player.CurrentDirection, ((TronPlayerStateUpdate)state).Direction))
                {
                    player.CurrentDirection = ((TronPlayerStateUpdate)state).Direction;
                }
            }
        }

        private string GetWinnerName()
        {
            var player = this.players.FirstOrDefault(item => item.IsPlayerAlive);
            if (player == null)
            {
                return "";
            }
            return player.Name;
        }

        private void AssignEachPlayerStartingPosition()
        {
            int playerPosition = 1;
            foreach (TronPlayer player in this.players)
            {
                player.PlayerPosition = playerPosition;
                switch (playerPosition)
                {
                    case 1:
                        player.CurrentPositionX = 1;
                        player.CurrentPositionY = 1;
                        player.CurrentDirection = TronGameDirection.Down;
                        break;
                    case 2:
                        player.CurrentPositionX = this.settings.TronBoardSizeX - 2;
                        player.CurrentPositionY = 1;
                        player.CurrentDirection = TronGameDirection.Left;
                        break;
                    case 3:
                        player.CurrentPositionX = this.settings.TronBoardSizeX - 2;
                        player.CurrentPositionY = this.settings.TronBoardSizeY - 2;
                        player.CurrentDirection = TronGameDirection.Up;
                        break;
                    case 4:
                        player.CurrentPositionX = 1;
                        player.CurrentPositionY = this.settings.TronBoardSizeY - 2;
                        player.CurrentDirection = TronGameDirection.Right;
                        break;
                }
                playerPosition++;
            }
        }

        private bool HasPlayerHitAWall(TronPlayer player)
        {
            //out of boundary Y
            if (player.CurrentPositionY < 0 || player.CurrentPositionY >= this.settings.TronBoardSizeY)
            {
                return true;
            }
            //out of boundary X
            if (player.CurrentPositionX < 0 || player.CurrentPositionX >= this.settings.TronBoardSizeX)
            {
                return true;
            }
            //Hit player wall
            if(this.board[player.CurrentPositionY, player.CurrentPositionX] == 1)
            {
                return true;
            }
            return false;
        }

        private bool ValidateDirection(TronGameDirection oldDirection, TronGameDirection newDirection)
        {
            switch (newDirection)
            {
                case TronGameDirection.Down:
                    return oldDirection != TronGameDirection.Up;
                case TronGameDirection.Right:
                    return oldDirection != TronGameDirection.Left;
                case TronGameDirection.Left:
                    return oldDirection != TronGameDirection.Right;
                case TronGameDirection.Up:
                    return oldDirection != TronGameDirection.Down;
            }
            return true;
        }
    }
}
