function WhiteTimer({ whiteTime, beatingClass }) {
  return (
    <div id="white-timer">
      <h1 id="white">White</h1>
      <h1 className={`time ${beatingClass}`}>0{whiteTime}</h1>
    </div>
  );
}

export default WhiteTimer;
