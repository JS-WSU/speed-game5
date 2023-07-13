import { useEffect, useState } from "react";
import axios from "axios";

function HighScores({ userSession }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {});

  return (
    <main className="container">
      <table class="table table-responsive table-hover">
        <thead>
          <tr>
            <th scope="col">PLace</th>
            <th scope="col">User</th>
            <th scope="col">Win Percentage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
          </tr>
        </tbody>
      </table>
      <div>
        <h2>Your winrate: </h2>
        <h2>Total Games Played:</h2>
      </div>
    </main>
  );
}

export default HighScores;
