import { useState } from "react";
import { Game } from "./Game";
import { Header } from "./Header";
function App() {
  const [gameStart, setGameStart] = useState(false);
  return (
    <div className="app">
      <Header />
      <Game isStart={gameStart} setStart={setGameStart} />
    </div>
  );
}
export default App;
