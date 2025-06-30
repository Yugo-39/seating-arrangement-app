import "../SeatGrid.css";

const SeatGrid = ({
  names,
  onNameChange,
  cols,
  fixedSeats,
  onToggleFixed,
  isShuffling,
}) => {
  return (
    <div
      className="seat-grid"
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
      }}
    >
      {names.map((name, i) => (
        <div key={i} className={`seat ${isShuffling ? "shuffling" : ""}`}>
          <input
            value={name}
            placeholder="空席"
            onChange={(e) => onNameChange(i, e.target.value)}
            className={`${
              fixedSeats?.[i] ? "fixed" : name.trim() === "" ? "empty" : ""
            }`}
          />
          <button className="lock-button" onClick={() => onToggleFixed(i)}>
            {fixedSeats?.[i] ? "🔒" : "🔓"}
          </button>
        </div>
      ))}
    </div>
  );
};
export default SeatGrid;
