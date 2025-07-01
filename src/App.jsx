// App.jsx
import "./App.css";
import { useState } from "react";
import { shuffleArray } from "./utils/shuffle";
import SeatGrid from "./components/SeatGrid";
import ResultScreen from "./components/ResultScreen";
import Confetti from "react-confetti";

function App() {
  const [rows, setRows] = useState(3); // 行数（縦の列数）
  const [cols, setCols] = useState(4); // 列数（横の列数）
  const [names, setNames] = useState(Array(12).fill("")); // 初期の名前リスト（12人分）
  const [fixedSeats, setFixedSeats] = useState(Array(12).fill(false)); // 固定席の状態
  const [isShuffling, setIsShuffling] = useState(false); // シャッフル中かどうかのフラグ
  const [showOverlay, setShowOverlay] = useState(false); // オーバーレイの表示フラグ
  const [showConfetti, setShowConfetti] = useState(false); // コンフェッティの表示フラグ

  // 名前の変更ハンドラー
  // index: 名前のインデックス, value: 新しい名前
  // names: 現在の名前リスト
  // setNames: 名前リストを更新する関数
  // この関数は、指定されたインデックスの名前を新しい値に更新します。
  // 例えば、handleNameChange(0, "Ando")は最初の名前を"Ando"に変更します。
  // これにより、ユーザーが
  // 名前を入力したり変更したりできるようになります。
  // namesの配列は、行数と列数に基づいて動的に生成されます。
  // 初期状態では、全ての名前は空文字列で埋められています。
  // ユーザーが名前を入力すると、
  // その名前がnames配列の対応するインデックスに保存されます
  // 例えば、3行4列のグリッドでは、namesは12個の要素を持ちます。
  // ユーザーが名前を入力することで
  // names配列の各要素が更新され、席替えの対象となります。
  // この関数は、席替えの際に名前をシャッフルするために使用されます。
  const handleNameChange = (index, value) => {
    const updated = [...names];
    updated[index] = value;
    setNames(updated);
  };

  // 固定席のトグルハンドラー
  // index: 固定席のインデックス
  // この関数は、指定されたインデックスの固定席の状態をトグルします。
  // 例えば、toggleFixedSeat(0)は最初の席の固定状態を切り替えます。
  // fixedSeatsは、各席が固定されているかどうかを示す
  // 真偽値の配列です。
  // 初期状態では、全ての席は固定されていません。
  // ユーザーが席を固定することで、その席の名前はシャッフルの対象外となります。
  // 例えば、3行4列のグリッドでは、fixedSeatsは12個の要素を持ちます。
  // ユーザーが特定の席を固定すると、その席の名前は
  // シャッフルの際に変更されず、固定されたままとなります。
  // この機能により、特定の席に特定の名前を固定しておくことができます。
  // これにより、特定の席に特定の名前を割り当てたい場合に便利です。
  // 例えば、講師の席や特定の生徒の席を固定することができます。
  // この関数は、席替えの際に名前をシャッフルするために使用されます。
  const toggleFixedSeat = (index) => {
    const updated = [...fixedSeats];
    updated[index] = !updated[index];
    setFixedSeats(updated);
  };

  // シャッフルハンドラー
  // この関数は、席替えを開始するためのハンドラーです
  // シャッフル中のフラグをtrueに設定し、オーバーレイを表示します。
  // 5秒後に、固定されていない席の名前をシャッフルし、
  // 新しい名前リストを生成します。
  // シャッフルが完了したら、シャッフル中のフラグをfalseに設定し、
  // オーバーレイを非表示にし、コンフェッティを表示します。
  // この関数は、席替えの際に
  // 名前をランダムに並べ替えるために使用されます。
  // シャッフルの際には、固定されている席の名前は変更されず、
  // 固定されていない席の名前のみがランダムに並べ替えられます。
  // これにより、特定の席に特定の名前を固定しつつ、
  // 他の席の名前をランダムに変更することができます。
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

  // リセットハンドラー
  // この関数は、全ての名前と固定席の状態をリセットします。
  // 名前リストを空文字列で埋め、固定席の状態を全てfalseに設定します。
  // また、オーバーレイとコンフェッティの表示を非表示にします。
  // この関数は、席替えをリセットするために使用されます。
  // ユーザーが全ての名前をクリアし、席替えを再度行いたい場合に便利です。
  // 例えば、席替えを行った後に全ての名前をクリアして
  // 新しい名前を入力し直すことができます。
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
          onNameChange={handleNameChange} // 名前の変更ハンドラー
          cols={cols} // 列数
          fixedSeats={fixedSeats} // 固定席の状態
          onToggleFixed={toggleFixedSeat} // 固定席のトグルハンドラー
          isShuffling={isShuffling} // シャッフル中かどうかのフラグ
        />

        <div className="button-group">
          <button onClick={handleShuffle}>席替えスタート</button>
          {/* 席替えを開始するボタン */}
          <button onClick={handleClear}>リセット</button>
          {/* リセットボタン */}
        </div>

        <div className="settings">
          <label>
            列（横）:
            <input
              type="number"
              value={cols} // 列数
              onChange={(e) => {
                const val = Number(e.target.value); // 数値に変換
                setCols(val); // 列数を更新// 行数と列数に基づいて名前リストと固定席の状態
                setNames(Array(rows * val).fill("")); // 名前リストを更新
                setFixedSeats(Array(rows * val).fill(false)); // 固定席の状態を更新
                // オーバーレイとコンフェッティの表示をリセット
                setShowOverlay(false); // オーバーレイを非表示
                setShowConfetti(false); // コンフェッティを非表示
              }}
            />
          </label>
          <label>
            行（縦）:
            <input
              type="number"
              value={rows} // 行数
              onChange={(e) => {
                const val = Number(e.target.value); // 数値に変換
                setRows(val); // 行数を更新
                setNames(Array(val * cols).fill("")); // 名前リストを更新
                // 行数と列数に基づいて名前リストと固定席の状態
                setFixedSeats(Array(val * cols).fill(false)); // 固定席の状態を更新
                setShowOverlay(false); // オーバーレイを非表示
                setShowConfetti(false); // コンフェッティを非表示
              }}
            />
          </label>
        </div>
      </div>
    </>
  );
}

export default App;
