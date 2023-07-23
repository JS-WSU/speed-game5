import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Game({ socket, children }) {
  const navigate = useNavigate();

  const QuitGame = () => {
    localStorage.removeItem("gameInSession");
    navigate("/lobby");
  };

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <main className="bg-success container-fluid">
      {children}
      <button onClick={QuitGame} className="btn btn-danger ">
        Quit Game
      </button>
    </main>
  );
}
