function BlackTimer({ blackTime, beatingClass, blackPlayer, showName }) {
  return (
    <div id="black-timer">
      {showName ? <h1 id="black">{blackPlayer}</h1> : null}
      <h1 className={`time ${beatingClass}`}>0{blackTime}</h1>
    </div>
  );
}

export default BlackTimer;
