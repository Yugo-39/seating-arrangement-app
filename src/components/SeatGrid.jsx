import "../SeatGrid.css";

const SeatGrid = ({
  names, // 名前のリスト
  onNameChange, // 名前変更のハンドラー
  cols, // 列数
  fixedSeats, // 固定席の状態
  onToggleFixed, // 固定席のトグルハンドラー
  isShuffling, // シャッフル中かどうかのフラグ
}) => {
  return (
    <div
      className="seat-grid"
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`, // 列数に基づいてグリッドの列を設定
      }}
    >
      {/* 各席を表示 */}
      {/* 名前のリストをマッピングして、各席を表示 */}
      {names.map((name, i) => (
        // 各席の要素を生成
        // keyにはインデックスを使用し、席の状態に応じてクラスを設定
        <div key={i} className={`seat ${isShuffling ? "shuffling" : ""}`}>
          {/* 各席の名前を表示する入力フィールド */}
          {/* 名前が空の場合は"空席"と表示 */}
          {/* 固定席の場合は"fixed"クラスを追加 */}
          {/* 名前が空の場合は"empty"クラスを追加 */}
          {/* 入力フィールドの変更時にはonNameChangeハンドラーを呼び出す */}
          <input
            value={name}
            placeholder="空席"
            onChange={(e) => onNameChange(i, e.target.value)}
            className={`${
              fixedSeats?.[i] ? "fixed" : name.trim() === "" ? "empty" : ""
            }`}
          />
          {/* 固定席のトグルボタンを表示 */}
          {/* ボタンのクリック時にはonToggleFixedハンドラーを呼び出す */}
          {/* ボタンのテキストは、固定席の場合は"🔒"、そうでない場合は"🔓"を表示 */}
          <button className="lock-button" onClick={() => onToggleFixed(i)}>
            {fixedSeats?.[i] ? "🔒" : "🔓"}
          </button>
        </div>
      ))}
    </div>
  );
};
export default SeatGrid;
