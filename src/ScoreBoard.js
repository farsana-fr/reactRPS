export function ScoreBoard({ pScore, cScore, maxScore }) {
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
