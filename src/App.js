import { useEffect, useState } from "react";
import BlackTimer from "./components/BlackTimer";
import Chessboard from "./components/Chessboard";
import WhiteTimer from "./components/WhiteTimer";
import Logo from "./components/Logo";

function App() {
  const [whiteTime, setWhiteTime] = useState(5);
  const [whiteTimer, setWhiteTimer] = useState(true);
  const [blackTime, setBlackTime] = useState(5);

  useEffect(() => {
    let whiteInterval;
    let blackInterval;
    if (whiteTimer) {
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
    return () => {
      clearInterval(whiteInterval);
      clearInterval(blackInterval);
    };
  }, [whiteTimer]);

  // if (whiteTime <= 0) {
  //   return <p>lost</p>;
  // }
  return (
    <>
      <Logo />
      <div id="timers-container">
        <WhiteTimer whiteTime={whiteTime} setWhiteTime={setWhiteTime} />
        <BlackTimer blackTime={blackTime} setBlackTime={setBlackTime} />
      </div>
      <div id="App">
        <Chessboard
          handleWhiteTime={setWhiteTime}
          handleBlackTime={setBlackTime}
          isWhiteTiming={whiteTimer}
          handleWhiteTimer={setWhiteTimer}
        />
      </div>
    </>
  );
}

export default App;
