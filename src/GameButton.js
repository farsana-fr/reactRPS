export function GameButton({ handlePSelect, children }) {
  return (
    <>
      <button className=" btn btn-light choiceBtn" onClick={handlePSelect}>
        {children}
      </button>
    </>
  );
}
