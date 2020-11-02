import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";
import react, { useState, useEffect } from "react";
function App() {
  const WIDTH = 8;
  const [markerCoords, setMarkerCoords] = useState({ x: 2, y: 1 });
  const [moveMarkers, setMoveMarkers] = useState([]);
  const [board, setBoard] = useState([]);

  useEffect(() => {
    setBoard(makeBoard());
  }, [markerCoords, moveMarkers]);

  function makeBoard() {
    let board = [];
    let isWhite = true;
    for (let col = 0; col < WIDTH; col++) {
      for (let row = 0; row < WIDTH; row++) {
        let moveMarker = moveMarkers.filter(
          ({ x, y }) => x === col && y === row
        )[0];
        board.push(
          <BoardSquare isWhite={isWhite} key={`${col}-${row}`}>
            <>
              {markerCoords.x === col && markerCoords.y === row && (
                <Marker x={col} y={row} setMoveMarkers={setMoveMarkers} />
              )}
              {moveMarker && (
                <MoveMarker
                  setMoveMarkers={setMoveMarkers}
                  setMarkerCoords={setMarkerCoords}
                  x={col}
                  y={row}
                />
              )}
            </>
          </BoardSquare>
        );
        isWhite = !isWhite;
      }
      isWhite = !isWhite;
    }
    return board;
  }
  return <div className="chessBoard">{board}</div>;
}

export default App;

function Marker({ x, y, setMoveMarkers }) {
  const [selected, setSelected] = useState(false);
  const moves = [
    [2, -1],
    [-2, -1],
    [2, 1],
    [-2, 1],
    [1, -2],
    [-1, -2],
    [1, 2],
    [-1, 2],
  ];

  let moveTo = [];
  if (!selected) {
    moves.forEach((move) => {
      let newX = x + move[0];
      let newY = y + move[1];
      if (newX >= 0 && newX <= 7 && newY >= 0 && newY <= 7) {
        moveTo.push({ x: newX, y: newY });
      }
    });
  }
  return (
    <MarkerDiv
      onClick={() => {
        setSelected(!selected);
        setMoveMarkers(moveTo);
      }}
      selected={selected}
    />
  );
}

const MoveMarker = ({ setMoveMarkers, setMarkerCoords, x, y }) => {
  return (
    <div
      onClick={() => {
        setMarkerCoords({ x, y });
        setMoveMarkers([]);
      }}
      className="available-move"
    >
      {" "}
      X{" "}
    </div>
  );
};

const MarkerDiv = styled.div`
  background-color: ${({ selected }) => (selected ? "red" : "blue")};
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;

const BoardSquare = ({ children, isWhite }) => {
  return <Square color={isWhite ? 1 : 0}>{children}</Square>;
};

const Square = styled.div`
  vertical-align: top;
  display: inline-flex;
  font-size: 2em;
  position: relative;
  width: 50px;
  height: 50px;
  background-color: ${(props) => (props.color ? "#fff" : "#000")};
  color: ${(props) => (props.isWhite ? "#000" : "white")};
`;
