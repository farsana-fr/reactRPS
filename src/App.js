import { useState } from "react";
function App() {
  const [playerScore, setPlayerScore] = useState(0);
  const [compScore, setCompScore] = useState(0);
  const [playerSelect, setPlayerSelect] = useState("./images/default.jpeg");
  const [compSelect, setCompSelect] = useState("./images/default.jpeg");

  return (
    <>
      <div className="overlay"></div>
      <div className="container game-area">
        <Header />
        <ScoreBoard pScore={playerScore} cScore={compScore} />
        <PlayGround
          pSelect={playerSelect}
          cSelect={compSelect}
          setPSelect={setPlayerSelect}
          setCSelect={setCompSelect}
          setPScore={setPlayerScore}
          setCScore={setCompScore}
        />
      </div>
    </>
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
function ScoreBoard({ pScore, cScore }) {
  console.log(pScore);
  return (
    <>
      <div className="row text-center">
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
}) {
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
    setTimeout(() => handleCSelect(), 1000);
  }
  function handleCSelect() {
    console.log("handleCSELECT");
    const num = Math.floor(Math.random() * 3);
    const options = ["rock", "paper", "scissor"];
    let compSel = options[num];
    console.log(compSel);
    setCSelect((img) => "./images/" + compSel + ".jpeg");
    //Now Handle ScoreBoard
    console.log("Now Score");
    let playerSel = document.getElementsByClassName("ds-plyr")[0].firstChild.src;

    //playerSel = playerSel.slice(29, -5);
    console.log(playerSel);
    const url = new URL(playerSel);

// url.pathname is "/images/paperslice"
const lastPart = url.pathname.split('/').pop(); // "paperslice"
const plyrSel = lastPart.substring(0, lastPart.lastIndexOf('.')); // "paperslice"
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
  }

  function handleReset() {
    setPSelect((img) => "./images/default.jpeg");
    setCSelect((img) => "./images/default.jpeg");
    setCScore((s) => 0);
    setPScore((s) => 0);
  }
  return (
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
        Reset
      </button>
    </>
  );
}
export default App;
