const Board = ({ squares, onClick }) => {
  return (
    <div className='board'>
      {squares.map((square, i) => (
        <button onClick={() => onClick(i)} key={i}>
          {square}
        </button>
      ))}
    </div>
  );
};

export default Board;
