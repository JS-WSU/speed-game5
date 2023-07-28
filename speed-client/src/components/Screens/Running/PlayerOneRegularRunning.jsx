import React from 'react'
import Card from "../../Card";

function PlayerOneRunning({game, socket, quitGame }) {
  console.log(game.playerOne.pile);
  return (
    <div>PlayerOneRunning
     
        <div className='d-flex'>
        <Card name={game.playerOne.fieldCards[0].name} src={game.playerOne.fieldCards[0].src} value={game.playerOne.fieldCards[0].value}></Card>
        <Card name={game.playerOne.fieldCards[1].name} src={game.playerOne.fieldCards[1].src} value={game.playerOne.fieldCards[1].value}></Card>
        

        </div>
        
      
      

      
      
      

      
    </div>
    
  )
}

export default PlayerOneRunning