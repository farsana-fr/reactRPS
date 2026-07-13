import { useState } from "react";
function App() {
  const [gameStart, setGameStart] = useState(false);
  return (
    <div className="app">
      <Header />
      <Game isStart={gameStart} setStart={setGameStart} />
    </div>
  );
}
function Game({ isStart, setStart }) {
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

function Header() {
  return (
    <>
      <header>
        <h1 className="text-center">Rock Paper Scissors</h1>
      </header>
    </>
  );
}
function ScoreBoard({ pScore, cScore, maxScore }) {
  return (
    <>
      <div className=" row text-center">
        <h3 className="col score-head">
          Player <span className="score-plyr">{pScore}</span>
        </h3>
        <h3 className="col score-head">
          Computer <span className="score-comp">{cScore}</span>
        </h3>
      </div>
    </>
  );
}
function PlayGround({
  pSelect,
  cSelect,
  setCSelect,
  setPSelect,
  setPScore,
  setCScore,
  maxScore,
  setStart,
}) {
  const [result, setResult] = useState("");
  function handlePSelect(e) {
    //alert("Hi");
    // console.log(e.target.firstChild.src)
    // console.log(e.target.src);
    //If button, get src of firstChild
    //If clicked on image, get src of that
    setPSelect((img) =>
      e.target.src ? e.target.src : e.target.firstChild.src,
    );

    //Now computer plays
    setTimeout(() => handleCSelect(), 500);
  }
  function handleCSelect() {
    console.log("handleCSELECT");
    const num = Math.floor(Math.random() * 3);
    const options = ["rock", "paper", "scissor"];
    let compSel = options[num];
    console.log(compSel);
    setCSelect((img) => "./images/" + compSel + ".jpeg");
    //Now Handle ScoreBoard
    //
    ///

    console.log("Now Score");
    let playerSel =
      document.getElementsByClassName("ds-plyr")[0]?.firstChild.src;

    //playerSel = playerSel.slice(29, -5);
    console.log(playerSel);
    const url = new URL(playerSel);

    // url.pathname is "/images/paperslice"
    const lastPart = url?.pathname.split("/").pop(); // "paperslice"
    const plyrSel = lastPart?.substring(0, lastPart.lastIndexOf(".")); // "paperslice"
    console.log(plyrSel);
    //const compSel=document.getElementsByClassName("ds-comp")[0].firstChild.src;
    if (
      (plyrSel === "scissor" && compSel === "paper") ||
      (plyrSel === "paper" && compSel === "rock") ||
      (plyrSel === "rock" && compSel === "scissor")
    ) {
      console.log("IF");
      setPScore((s) => s + 1);
    }
    if (
      (compSel === "scissor" && plyrSel === "paper") ||
      (compSel === "paper" && plyrSel === "rock") ||
      (compSel === "rock" && plyrSel === "scissor")
    ) {
      console.log("ELSE IF");
      setCScore((s) => s + 1);
    }
    setTimeout(() => checkScore(), 1000);
  }
  function checkScore() {
    const cScore = Number(
      document.getElementsByClassName("score-comp")[0].textContent,
    );
    const pScore = Number(
      document.getElementsByClassName("score-plyr")[0].textContent,
    );
    console.log("checkScore", pScore, cScore);
    console.log("maxScore", maxScore);

    const result =
      pScore === maxScore && pScore > cScore
        ? "Player"
        : cScore === maxScore && cScore > pScore
          ? "Computer"
          : "Draw";
    console.log(result);
    if (result !== "Draw") {
      //alert(result + "Wins");
      setResult((r) => r + result);
    }
  }

  function handleReset() {
    setPSelect((img) => "./images/default.jpeg");
    setCSelect((img) => "./images/default.jpeg");
    setCScore((s) => 0);
    setPScore((s) => 0);
    setResult((r) => "");
    setStart((s) => false);
  }
  return result === "" ? (
    <>
      <div className="current-selection text-center">
        <div className="row">
          <div className="col dspl ds-plyr">
            <img src={pSelect} alt="Player Selection" />
          </div>
          <div className="col dspl ds-comp">
            <img src={cSelect} alt="Computer Selection" />
          </div>
        </div>
      </div>

      <div className="game text-center">
        <button className=" btn btn-light choiceBtn" onClick={handlePSelect}>
          <img src="./images/rock.jpeg" width="40px" alt="Rock" />
        </button>
        <button className=" btn btn-light choiceBtn" onClick={handlePSelect}>
          <img src="./images/paper.jpeg" width="40px" alt="Paper" />
        </button>
        <button className=" btn btn-light choiceBtn" onClick={handlePSelect}>
          <img src="./images/scissor.jpeg" width="40px" alt="Scissors" />
        </button>
      </div>
      <button
        className="container btn pink rst text-center"
        onClick={handleReset}
      >
        Restart
      </button>
    </>
  ) : (
    <>
      <div className="overlay"> </div>
      <div className={` msg  ${result === "Player" ? "green" : "red"}`}>
        <h1 className="text-center">{result} Won</h1>
        <button className="  rst" onClick={handleReset}>
          Restart
        </button>
      </div>
    </>
  );
}

export default App;
