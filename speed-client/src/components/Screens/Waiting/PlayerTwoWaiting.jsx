function PlayerTwoWaiting({ game, quitGame, socket, readyUp }) {
  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="d-flex text-light">
        <div>
          <div
            className={`mb-2 p-3 ${
              game.playerOne.ready ? "bg-primary" : "bg-danger"
            }`}
          >
            Player One {game.playerOne.name}:{" "}
            {game.playerOne.ready ? "Ready" : "Not Ready"}
          </div>
          <div
            className={`p-3 ${
              game.playerTwo.ready ? "bg-primary" : "bg-danger"
            }`}
          >
            Player Two {game.playerTwo.name}:{" "}
            {game.playerTwo.ready ? "Ready" : "Not Ready"}
          </div>
        </div>
        <div className="bg-secondary align-self-start p-3 ms-auto">
          Viewers:
          {game.viewers.map((viewer) => (
            <div>{viewer}</div>
          ))}
        </div>
      </div>
      <div className="m-auto bg-light p-3 text-dark">
        <div>Waiting for host {game.playerOne.name} to start game...</div>
        <div className="d-flex justify-content-center mt-2 text-light">
          <button
            onClick={readyUp}
            className={`text-light btn ${
              game.playerTwo.ready ? "bg-primary" : "bg-secondary"
            }`}
          >
            {game.playerTwo.ready ? "Not Ready" : "Ready Up"}
          </button>
        </div>
      </div>
      <div>
        <button onClick={quitGame} className="btn btn-danger text-light">
          Quit Game
        </button>
      </div>
    </div>
  );
}

export default PlayerTwoWaiting;
