import { useEffect, useState } from "react";
import BlackTimer from "./components/BlackTimer";
import Chessboard from "./components/Chessboard";
import WhiteTimer from "./components/WhiteTimer";
import Logo from "./components/Logo";

function App() {
  const [whiteTime, setWhiteTime] = useState(5);
  const [isWhiteMoving, setIsWhiteMoving] = useState(true);
  const [blackTime, setBlackTime] = useState(5);
  const [beatingClass, setBeatingClass] = useState({
    white: "beating-class-white",
    black: undefined,
  });

  useEffect(() => {
    let whiteInterval;
    let blackInterval;
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
    return () => {
      clearInterval(whiteInterval);
      clearInterval(blackInterval);
    };
  }, [isWhiteMoving]);

  // if (whiteTime <= 0 || blackTime <= 0) {
  //   if (isWhiteMoving) {
  //     return <p>White Lost on time!</p>;
  //   } else {
  //     return <p>Black Lost on time!</p>;
  //   }
  // }
  return (
    <>
      <Logo />
      <div id="timers-container">
        <WhiteTimer
          whiteTime={whiteTime}
          setWhiteTime={setWhiteTime}
          beatingClass={beatingClass.white}
        />
        <BlackTimer
          blackTime={blackTime}
          setBlackTime={setBlackTime}
          beatingClass={beatingClass.black}
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
