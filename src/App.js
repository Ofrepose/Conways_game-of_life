import React from 'react';
import './App.css';
import Game from "./components/scripts/Game";

export let canvas;
export let ctx;

let game;
let gameRunner;

export default function App() {

  const startRandom = () =>{

    canvas = document.querySelector("#gamefield")
    ctx = canvas.getContext("2d")
    game = new Game();
    game.gameSetUp();
    game.arrayRandomize();
    game.fillArray();
    gameRunner = window.setInterval(runGame, 100);

  }

  const runGame = () =>{

    game.runGame();

  }

  const stopRandom = () =>{

    game.gameSetUp();
    return gameRunner = window.clearInterval(gameRunner)

  }

  const getCanvasLocation = (event) =>{

      let rect = canvas.getBoundingClientRect();
      let x = event.clientX - rect.left;
      let y = event.clientY - rect.top;
      console.log("Coordinate x: " + x,
          "Coordinate y: " + y);
      game.cellAdd(y,x)

  }


  return (

    <div className="App">

      <h1>Game of Life</h1>

      <div className="buttons-div">

        <div className='styledButton' id="start-random" onClick={()=>startRandom()}>Start: Random</div>

        <div className='styledButton' id="stop" onClick={stopRandom}>Stop: Reset</div>

      </div>

      <canvas onClick={getCanvasLocation} id="gamefield" width="1400" height="500"></canvas>

    </div>

  );
}


