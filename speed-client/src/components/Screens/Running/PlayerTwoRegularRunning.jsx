import React from 'react'
import Card from '../../Card'

function PlayerTwoRunning({game, socket, quitGame }) {
  let opponentHand = [];
  for(let i = 0; i < game.playerOne.hand; i++){
    opponentHand.push(<Card src='/img/PNG-cards-1.3/cardback.png'></Card>)
  }
  return (
    <div>PlayerTwoRunning
      <div>
          <p>Player One Hand: {game.playerOne.hand}</p>
          <p>Player One Draw Pile: {game.playerOne.drawPile}</p>
        </div>
      
      <div className='d-flex'>{opponentHand.map(card=>card)}</div>
      <div className='d-flex'>
      <Card src='/img/PNG-cards-1.3/cardback.png'></Card>
      <Card name={game.playerTwo.fieldCards[0].name} src={game.playerTwo.fieldCards[0].src} value={game.playerTwo.fieldCards[0].value}></Card>
      <Card name={game.playerOne.fieldCards[0].name} src={game.playerOne.fieldCards[0].src} value={game.playerOne.fieldCards[0].value}></Card>
          
      <Card src='/img/PNG-cards-1.3/cardback.png'></Card>
      </div>
      <div className='d-flex'>
      {game.playerTwo.hand.map(card=>(<Card name={card.name} src={card.src} value={card.value}></Card>))}        
        </div>
    </div>
  )
}

export default PlayerTwoRunning