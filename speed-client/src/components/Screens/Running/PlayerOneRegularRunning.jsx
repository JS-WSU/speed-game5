import React from 'react'
import Card from "../../Card";

function PlayerOneRunning({game, socket, quitGame }) {
  console.log(game);
  let opponentHand = [];
  for(let i = 0; i < game.playerTwo.hand; i++){
    opponentHand.push(<Card src='/img/PNG-cards-1.3/cardback.png'></Card>)
  }
  return (
    <div>PlayerOneRunning

        <div>
          <p>Player Two Hand: {game.playerTwo.hand}</p>
          <p>Player Two Draw Pile: {game.playerTwo.drawPile}</p>
        </div>
        <div className='d-flex'>{opponentHand.map(card=>card)}</div>
        
        <div className='d-flex'>
        <Card src='/img/PNG-cards-1.3/cardback.png'></Card>
        <Card name={game.playerOne.fieldCards[0].name} src={game.playerOne.fieldCards[0].src} value={game.playerOne.fieldCards[0].value}></Card>
        <Card name={game.playerTwo.fieldCards[0].name} src={game.playerTwo.fieldCards[0].src} value={game.playerTwo.fieldCards[0].value}></Card>
        <Card src='/img/PNG-cards-1.3/cardback.png'></Card>
        </div>
        <div className='d-flex'>
          {game.playerOne.hand.map(card=>(<Card name={card.name} src={card.src} value={card.value}></Card>))}        
        </div>
        
      
      

      
      
      

      
    </div>
    
  )
}

export default PlayerOneRunning