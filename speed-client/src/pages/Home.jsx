import React from "react";
import { useState } from "react";
import { SpeedTypes } from "../utils/Constants.mjs";
import { Navigate } from "react-router-dom";

function Home() {
  const [showCalifornia, setShowCalifornia] = useState(false);
  const [showRegular, setShowRegular] = useState(false);

  if (localStorage.getItem("gameInSession")) {
    return JSON.parse(localStorage.getItem("gameInSession")).speedType ===
      SpeedTypes.REGULAR ? (
      <Navigate to="/regular-speed" replace />
    ) : (
      <Navigate to="/california-speed" replace />
    );
  }
  return (
    <main className="container">
      <h1>Welcome to Speed!</h1>
      <div>
        <h2>Instructions</h2>
        <div className="row row-cols-2">
          <div className="d-flex flex-column mb-3 mb-lg-0">
            <button
              onClick={() => setShowCalifornia(!showCalifornia)}
              className="btn btn-danger mx-auto mb-2 border border-3"
            >
              California Speed
            </button>

            {showCalifornia && (
              <ul className="list-group list-group-flush ">
                <li className="list-group-item list-group-item-danger mb-3">
                  1. Cards are shuffled and players are dealt 26 cards
                </li>
                <li className="list-group-item list-group-item-danger mb-3">
                  2. Each player deals 4 cards face up in front
                </li>
                <li className="list-group-item list-group-item-danger mb-3">
                  3. Once the last card is dealt, any player can place a card in
                  the wherever double value cards are present (also for triples
                  as well)
                </li>
                <li className="list-group-item list-group-item-danger mb-3">
                  4. If no double value cards are present, each player takes the
                  cards on their side and puts them in their deck and reshuffles
                </li>
                <li className="list-group-item list-group-item-danger">
                  5. The game ends when a player does not have anymore cards
                  remaining in their deck
                </li>
              </ul>
            )}
          </div>
          <div className="d-flex flex-column">
            <button
              onClick={() => setShowRegular(!showRegular)}
              className="btn btn-primary mx-auto mb-2 border border-3"
            >
              Regular Speed
            </button>
            {showRegular && (
              <ul className="list-group list-group-flush ">
                <li className="list-group-item list-group-item-primary mb-3">
                  1. Cards are shuffled and players are given 5 cards each as
                  their playing hand, 15 cards each as personal playing deck. 2
                  cards are placed face down in front of each player, and
                  finally 5 cards are placed beside the 2 cards face down
                </li>
                <li className="list-group-item list-group-item-primary mb-3">
                  2. The two cards in the center are revealed. Players must
                  match either of the 2 face down cards up one or down one ex. 7
                  means either a 6 or 8 can be played. An ace would mean either
                  King or 2 could be placed
                </li>
                <li className="list-group-item list-group-item-primary mb-3">
                  3. Players can draw from personal deck if they have less than
                  5 playing cards
                </li>
                <li className="list-group-item list-group-item-primary mb-3">
                  4. If no player can play from their hand, then a card from
                  each side pile is placed on the center piles. If side piles
                  are empty, then central piles are reshuffled and a card from
                  each pile is placed onto the center
                </li>
                <li className="list-group-item list-group-item-primary mb-3">
                  5. Game ends once a player has gotten rid of their playing
                  hand and drawing deck
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
