import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './TicTacToe.css';
import FancyButton from '../small/FancyButton';

/* 
  Esta tarea consiste en hacer que el juego funcione, para lograr eso deben completar el componente 
  TicTacToe y el custom hook `useTicTacToeGameState`, que como ven solamente define algunas variables.

  Para completar esta tarea, es requisito que la FIRMA del hook no cambie.
  La firma de una función consiste en los argumentos que recibe y el resultado que devuelve.
  Es decir, este hook debe recibir el argumento initialPlayer y debe devolver un objeto con las siguientes propiedades:
  {
    tiles: // un array de longitud 9 que representa el estado del tablero (es longitud 9 porque el tablero es 3x3)
    currentPlayer: // un string que representa el jugador actual ('X' o 'O')
    winner: // el ganador del partido, en caso que haya uno. si no existe, debe ser `null`
    gameEnded: // un booleano que representa si el juego terminó o no
    setTileTo: // una función que se ejecutará en cada click
    restart: // una función que vuelve a setear el estado original del juego
  }

  Verán que los diferentes componentes utilizados están completados y llevan sus propios propTypes
  Esto les dará algunas pistas
*/

const Square = ({ value, onClick = () => {} }) => {
  return (
    <div onClick={onClick} className="square">
      {value}
    </div>
  );
};
Square.propTypes = {
  value: PropTypes.oneOf(['X', 'O', '']),
  onClick: PropTypes.func,
};

const WinnerCard = ({ show, winner, onRestart = () => {} }) => {
  return (
    <div className={cx('winner-card', { 'winner-card--hidden': !show })}>
      <span className="winner-card-text">
        {winner ? `Player ${winner} has won the game!` : "It's a tie!"}
      </span>
      <FancyButton onClick={onRestart}>Play again?</FancyButton>
    </div>
  );
};

WinnerCard.propTypes = {
  // Esta propiedad decide si el componente se muestra o está oculto
  // También se podría mostrar el componente usando un if (&&), pero usamos esta prop para mostrar los estilos correctamente.
  show: PropTypes.bool.isRequired,
  winner: PropTypes.oneOf(['X', 'O']),
  onRestart: PropTypes.func,
};

const getWinner = tiles => {
  let ganador = null;
  const casosGanadores = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,6,4]];

  casosGanadores.forEach( (caso) =>{
    if(tiles[caso[0]] === 'X' && tiles[caso[1]] === 'X' && tiles[caso[2]] === 'X' ){
      ganador = 'X';
      return;
    }
    if(tiles[caso[0]] === 'O' && tiles[caso[1]] === 'O' && tiles[caso[2]] === 'O' ){
      ganador = 'O';
      return;
    }
  })


  return ganador;
};

const useTicTacToeGameState = initialPlayer => {

  const [tiles, setTiles] = useState(['','','','','','','','','']);
  const [currentPlayer, setCurrentPlayer] = useState(initialPlayer);
  const [winner, setWinner] = useState(null);
  const [gameEnded, setGameEnded] = useState(false);
 
  const handleCurrentPlayer = () => {
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  }

  const setTileTo = (tileIndex, player) => {
    setTiles(tiles.map((elemento,index) => index === tileIndex ? player : elemento ));
    handleCurrentPlayer();
  };

  const restart = () => {
    setGameEnded(false);
    setTiles(['','','','','','','','','']);
    setWinner(null);
    setCurrentPlayer(initialPlayer);
  };


  useEffect(() => {
    if (getWinner(tiles)){
      setWinner(getWinner(tiles));
      setGameEnded(true);
    }else{
      if (!tiles.includes('')){
        setGameEnded(true);
      }
    }
  }, [tiles]);

    
  return { tiles, currentPlayer, winner, gameEnded, setTileTo, restart };
};

const TicTacToe = () => {
  const { tiles, currentPlayer, winner, gameEnded, setTileTo, restart } = useTicTacToeGameState('X');
  
  
  return (
    <div className="tictactoe">
      <WinnerCard show={gameEnded} winner={winner} onRestart={restart}/>
      

      <div className="tictactoe-row">
      <Square value={tiles[0]} key={0} onClick={(e) => e.target.innerText === '' ? setTileTo(0,currentPlayer) : () => {}}/>
      <Square value={tiles[1]} key={1} onClick={(e) => e.target.innerText === '' ? setTileTo(1,currentPlayer) : () => {}}/>
      <Square value={tiles[2]} key={2} onClick={(e) => e.target.innerText === '' ? setTileTo(2,currentPlayer) : () => {}}/>
      </div> 
      <div className="tictactoe-row">
      <Square value={tiles[3]} key={3} onClick={(e) => e.target.innerText === '' ? setTileTo(3,currentPlayer) : () => {}}/>
      <Square value={tiles[4]} key={4} onClick={(e) => e.target.innerText === '' ? setTileTo(4,currentPlayer) : () => {}}/>
      <Square value={tiles[5]} key={5} onClick={(e) => e.target.innerText === '' ? setTileTo(5,currentPlayer) : () => {}}/>
      </div> 
      <div className="tictactoe-row">
      <Square value={tiles[6]} key={6} onClick={(e) => e.target.innerText === '' ? setTileTo(6,currentPlayer) : () => {}}/>
      <Square value={tiles[7]} key={7} onClick={(e) => e.target.innerText === '' ? setTileTo(7,currentPlayer) : () => {}}/>
      <Square value={tiles[8]} key={8} onClick={(e) => e.target.innerText === '' ? setTileTo(8,currentPlayer) : () => {}}/>
      </div> 
        
    </div>
  );
};
export default TicTacToe;
