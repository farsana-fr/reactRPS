import { useState } from "react";
import { ScoreBoard } from "./ScoreBoard";
import { PlayGround } from "./PlayGround";

export function Game({ isStart, setStart }) {
  const [playerScore, setPlayerScore] = useState(0);
  const [compScore, setCompScore] = useState(0);
  const [playerSelect, setPlayerSelect] = useState("./images/default.jpeg");
  const [compSelect, setCompSelect] = useState("./images/default.jpeg");
  const [maxScore, setMaxScore] = useState();
  function handleSubmit(e) {
    e.preventDefault();
    if (maxScore <= 0) {
      alert("Enter a number greater than 0");
    } else setStart((v) => true);
  }
  function handleMaxScore(e) {
    setMaxScore((score) => Number(e.target.value));
  }
  return !isStart ? (
    <>
      <div className=" welcome ">
        <form className="input col-auto" onSubmit={handleSubmit}>
          <label className="form-label">Enter Maximum Score</label>
          <input
            type="number"
            className="form-control max-score"
            value={maxScore}
            onChange={handleMaxScore}
            required
          />

          <button type="submit" className="btn pink submit mt-5">
            Submit
          </button>
        </form>
      </div>
    </>
  ) : (
    <div className="  game-area ">
      <ScoreBoard pScore={playerScore} cScore={compScore} />
      <PlayGround
        pSelect={playerSelect}
        cSelect={compSelect}
        setPSelect={setPlayerSelect}
        setCSelect={setCompSelect}
        setPScore={setPlayerScore}
        setCScore={setCompScore}
        maxScore={maxScore}
        setStart={setStart}
      />
    </div>
  );
}
