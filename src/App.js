import { useEffect, useState } from "react";
import BlackTimer from "./components/BlackTimer";
import Chessboard from "./components/Chessboard";
import WhiteTimer from "./components/WhiteTimer";
import Logo from "./components/Logo";
import BasicModal from "./components/Modal";

function App() {
  const [players, setPlayers] = useState({ white: "", black: "" });
  const [showNames, setShowNames] = useState(false);
  const [gameHasStarted, setGameHasStarted] = useState(false);
  const [isWhiteMoving, setIsWhiteMoving] = useState(true);
  const [whiteTime, setWhiteTime] = useState(5);
  const [blackTime, setBlackTime] = useState(5);
  const [beatingClass, setBeatingClass] = useState({
    white: undefined,
    black: undefined,
  });

  //set the beating of the timers
  useEffect(() => {
    let whiteInterval;
    let blackInterval;
    if (gameHasStarted) {
      if (isWhiteMoving) {
        whiteInterval = setInterval(() => {
          setWhiteTime((prev) => prev - 1);
        }, 1000);
        clearInterval(blackInterval);
      } else {
        blackInterval = setInterval(() => {
          setBlackTime((prev) => prev - 1);
        }, 1000);
        clearInterval(whiteInterval);
      }
    }
    return () => {
      clearInterval(whiteInterval);
      clearInterval(blackInterval);
    };
  }, [isWhiteMoving, gameHasStarted]);

  // if (whiteTime <= 0 || blackTime <= 0) {
  //   if (isWhiteMoving) {
  //     return <p>White Lost on time!</p>;
  //   } else {
  //     return <p>Black Lost on time!</p>;
  //   }
  // }
  return (
    <>
      <BasicModal
        players={players}
        setPlayers={setPlayers}
        setGameHasStarted={setGameHasStarted}
        setBeatingClass={setBeatingClass}
        handleShowName={setShowNames}
      />
      <Logo />
      <div id="timers-container">
        <WhiteTimer
          whiteTime={whiteTime}
          setWhiteTime={setWhiteTime}
          beatingClass={beatingClass.white}
          whitePlayer={players.white}
          showName={showNames}
        />
        <BlackTimer
          blackTime={blackTime}
          setBlackTime={setBlackTime}
          beatingClass={beatingClass.black}
          blackPlayer={players.black}
          showName={showNames}
        />
      </div>
      <div id="App">
        <Chessboard
          handleWhiteTime={setWhiteTime}
          handleBlackTime={setBlackTime}
          isWhiteTiming={isWhiteMoving}
          handleWhiteTimer={setIsWhiteMoving}
          handleBeatingClass={setBeatingClass}
        />
      </div>
    </>
  );
}

export default App;
