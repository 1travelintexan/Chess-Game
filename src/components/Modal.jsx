import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "rgba(0, 0, 0, 0.816)",
  color: "rgb(98, 208, 255)",
  border: "2px solid rgb(98, 208, 255)",
  boxShadow: "0 0 30px rgb(98, 208, 255)",
  borderRadius: "3rem",
  p: 10,
  fontFamily: "Cinzel, serif",
};

export default function BasicModal({
  setPlayers,
  players,
  setGameHasStarted,
  setBeatingClass,
  handleShowName,
}) {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    handleShowName(true);
    setOpen(false);
    setGameHasStarted(true);
    setBeatingClass({
      white: "beating-class-white",
      black: undefined,
    });
  };

  const handlePlayerNames = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setPlayers({ ...players, [name]: value });
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Welcome to Move it -or Lose it
          </Typography>
          <Typography id="modal-modal-description" sx={{ m: 5 }}>
            Each player will have 5 seconds a move. When you begin the game, the
            white timer will start. If either timer hits zero, that player
            loses. Good Luck!
          </Typography>
          <div id="box-modal-inputs">
            <div>
              <label>White Player:</label>
              <input onChange={handlePlayerNames} name="white" />
            </div>
            <Button onClick={handleClose}>Start Game</Button>
            <div>
              <label>Black Player:</label>
              <input onChange={handlePlayerNames} name="black" />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
