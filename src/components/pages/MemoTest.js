import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './MemoTest.css';
import cx from 'classnames';
import FancyButton from '../small/FancyButton';




const Square = ({ id, onclick = () => { } }) => {

  return (
    <div id={id} className='square white' onClick={onclick}></div>
  )

}

Square.propTypes = {
  id: PropTypes.string.isRequired,
  onclick: PropTypes.func,
};

const WinnerCard = ({ show, movements , onRestart = () => {} }) => {
  return (
    <div className={cx('winner-card', { 'winner-card--hidden': !show })}>
      <span className="winner-card-text">
        {`You did it in ${movements} moves`}
      </span>
      <FancyButton onClick={onRestart}>Play again?</FancyButton>
    </div>
  );
};

WinnerCard.propTypes = {
  show: PropTypes.bool.isRequired,
  movements: PropTypes.number.isRequired,
  onRestart: PropTypes.func.isRequired,
};

const getColorsRandom = () => {
  const colors = ['red', 'red', 'blue', 'blue', 'green', 'green', 'yellow', 'yellow', 'orange', 'orange', 'purple', 'purple', 'pink', 'pink', 'black', 'black'];

  for (let i = 0; i < colors.length; i++) {
    const positionRandom = Math.floor(Math.random() * colors.length);
    const aux = colors[positionRandom];
    colors[positionRandom] = colors[i];
    colors[i] = aux;
  }

  return colors;
}


const useTicTacToeGameState = () => {

  const [tiles, setTiles] = useState(getColorsRandom());
  const [chosenColors, setChosenColors] = useState([]);
  const [successfulColors, setSuccessfulColors] = useState([]); 
  const [blockedColors, setBlockedColors] = useState([]);
  const [gameEnded, setGameEnded] = useState(false); 
  const [movements, setMovements] = useState(0);


  const setTileTo = (event, color) => {
    event.target.style.backgroundColor = color;
    setChosenColors([...chosenColors, [event.target, color]]);
    setBlockedColors([...blockedColors,event.target.id]);
  }

  const restart = () => {
    successfulColors.forEach((e) => e.style.backgroundColor = 'white');
    setTiles(getColorsRandom());
    setChosenColors([]);
    setSuccessfulColors([]);
    setBlockedColors([]);
    setGameEnded(!gameEnded);
    setMovements(0);
  }

  useEffect(() => {

    if (chosenColors.length === 2) {
      if (chosenColors[0][1] === chosenColors[1][1]) {   
        setSuccessfulColors([...successfulColors, chosenColors[0][0],chosenColors[1][0]]);
      } else {
        setBlockedColors((colors) => colors.filter((elemento) => elemento !== chosenColors[0][0].id));
        setBlockedColors((colors) => colors.filter((elemento) => elemento !== chosenColors[1][0].id));
        setTimeout(() => {
          chosenColors[0][0].style.backgroundColor = 'white';
          chosenColors[1][0].style.backgroundColor = 'white';
        }, 500);
      }
      setChosenColors([]);
      setMovements(m => m + 1);
    }
  }, [chosenColors])

  useEffect(() => {
    if(successfulColors.length === 16){
      setGameEnded(!gameEnded);
    }
  
  }, [successfulColors])
  


  return { tiles, gameEnded, setTileTo, restart, movements, blockedColors }
}




const MemoTest = () => {

  const { tiles, gameEnded, setTileTo, restart, movements, blockedColors } = useTicTacToeGameState()

  return (
    <>
    <div className='memotest'>

      <WinnerCard show={gameEnded} movements={movements} onRestart={restart}/>

      <div className='memotest-row'>
        <Square id={'tile-0'} onclick={blockedColors.includes('tile-0') ? () => { } : (e) => setTileTo(e, tiles[0])} />
        <Square id={'tile-1'} onclick={blockedColors.includes('tile-1') ? () => { } : (e) => setTileTo(e, tiles[1])} />
        <Square id={'tile-2'} onclick={blockedColors.includes('tile-2') ? () => { } : (e) => setTileTo(e, tiles[2])} />
        <Square id={'tile-3'} onclick={blockedColors.includes('tile-3') ? () => { } : (e) => setTileTo(e, tiles[3])} />
      </div>
      <div className='memotest-row'>
        <Square id={'tile-4'} onclick={blockedColors.includes('tile-4') ? () => { } : (e) => setTileTo(e, tiles[4])} />
        <Square id={'tile-5'} onclick={blockedColors.includes('tile-5') ? () => { } : (e) => setTileTo(e, tiles[5])} />
        <Square id={'tile-6'} onclick={blockedColors.includes('tile-6') ? () => { } : (e) => setTileTo(e, tiles[6])} />
        <Square id={'tile-7'} onclick={blockedColors.includes('tile-7') ? () => { } : (e) => setTileTo(e, tiles[7])} />
      </div>
      <div className='memotest-row'>
        <Square id={'tile-8'} onclick={blockedColors.includes('tile-8') ? () => { } : (e) => setTileTo(e, tiles[8])} />
        <Square id={'tile-9'} onclick={blockedColors.includes('tile-9') ? () => { } : (e) => setTileTo(e, tiles[9])} />
        <Square id={'tile-10'} onclick={blockedColors.includes('tile-10') ? () => { } : (e) => setTileTo(e, tiles[10])} />
        <Square id={'tile-11'} onclick={blockedColors.includes('tile-11') ? () => { } : (e) => setTileTo(e, tiles[11])} />
      </div>
      <div className='memotest-row'>
        <Square id={'tile-12'} onclick={blockedColors.includes('tile-12') ? () => { } : (e) => setTileTo(e, tiles[12])} />
        <Square id={'tile-13'} onclick={blockedColors.includes('tile-13') ? () => { } : (e) => setTileTo(e, tiles[13])} />
        <Square id={'tile-14'} onclick={blockedColors.includes('tile-14') ? () => { } : (e) => setTileTo(e, tiles[14])} />
        <Square id={'tile-15'} onclick={blockedColors.includes('tile-15') ? () => { } : (e) => setTileTo(e, tiles[15])} />
      </div>
    </div>

    <div>
      {movements} movements
    </div>
    </>
  )
}
export default MemoTest;