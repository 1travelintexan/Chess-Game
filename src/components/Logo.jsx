import logo from "../images/chess-logo.png";
function Logo() {
  return (
    <div id="logo-container">
      <img src={logo} alt="logo" id="logo-image" />
      <h2 id="logo">Move it -or- Lose it</h2>
    </div>
  );
}

export default Logo;
