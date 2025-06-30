// App.jsx
import "./App.css";
import { useState } from "react";
import { shuffleArray } from "./utils/shuffle";
import SeatGrid from "./components/SeatGrid";
import ResultScreen from "./components/ResultScreen";
import Confetti from "react-confetti";


function App() {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(4);
  const [names, setNames] = useState(Array(12).fill(""));
  const [fixedSeats, setFixedSeats] = useState(Array(12).fill(false));
  const [isShuffling, setIsShuffling] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleNameChange = (index, value) => {
    const updated = [...names];
    updated[index] = value;
    setNames(updated);
  };

  const toggleFixedSeat = (index) => {
    const updated = [...fixedSeats];
    updated[index] = !updated[index];
    setFixedSeats(updated);
  };

  const handleShuffle = () => {
    setIsShuffling(true);
    setShowOverlay(true);
    setShowConfetti(false);

    setTimeout(() => {
      const movable = names.filter((_, i) => !fixedSeats[i]);
      const shuffled = shuffleArray(movable);
      const newNames = names.map((name, i) =>
        fixedSeats[i] ? name : shuffled.shift() || ""
      );
      setNames(newNames);
      setIsShuffling(false);
      setShowOverlay(false);
      setShowConfetti(true);
    }, 5000); // 5秒後にシャッフル完了
  };

  const handleClear = () => {
    setNames(Array(rows * cols).fill(""));
    setFixedSeats(Array(rows * cols).fill(false));
    setShowOverlay(false);
    setShowConfetti(false);
  };

  return (
    <>

      {/* 🔥 画面全体に重ねるオーバーレイ */}
      {showOverlay && (
        <div className="dark-screen">
          <ResultScreen showResult={true} />
        </div>
      )}

      {/* 🎉 コンフェッティ */}
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      {/* 💻 アプリ本体 */}
      <div className="app-container">
        <h1>席替えアプリ</h1>
        <div className="board-header">🧭 ホワイトボード（前方）</div>

        <SeatGrid
          names={names}
          onNameChange={handleNameChange}
          cols={cols}
          fixedSeats={fixedSeats}
          onToggleFixed={toggleFixedSeat}
          isShuffling={isShuffling}
        />

        <div className="button-group">
          <button onClick={handleShuffle}>席替えスタート</button>
          <button onClick={handleClear}>リセット</button>
        </div>

        <div className="settings">
          <label>
            列（横）:
            <input
              type="number"
              value={cols}
              onChange={(e) => {
                const val = Number(e.target.value);
                setCols(val);
                setNames(Array(rows * val).fill(""));
                setFixedSeats(Array(rows * val).fill(false));
                setShowOverlay(false);
                setShowConfetti(false);
              }}
            />
          </label>
          <label>
            行（縦）:
            <input
              type="number"
              value={rows}
              onChange={(e) => {
                const val = Number(e.target.value);
                setRows(val);
                setNames(Array(val * cols).fill(""));
                setFixedSeats(Array(val * cols).fill(false));
                setShowOverlay(false);
                setShowConfetti(false);
              }}
            />
          </label>
        </div>
      </div>
    </>
  );
}

export default App;
