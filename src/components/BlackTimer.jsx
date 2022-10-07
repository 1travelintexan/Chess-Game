function BlackTimer({ blackTime, beatingClass }) {
  return (
    <div id="black-timer">
      <h1 id="black">Black</h1>
      <h1 className={`time ${beatingClass}`}>0{blackTime}</h1>
    </div>
  );
}

export default BlackTimer;
