import React, { useState, useEffect } from "react";
import styled from "styled-components";

const width = 8;
export default function Board({
  clearAvailableMoves,
  getPieces,
  movePiece,
  availableMoves,
  getNewPiece,
  selectedPiece,
}) {
  let from;
  if (selectedPiece) {
    from = { x: selectedPiece.x, y: selectedPiece.y };
  }
  let { WhitePieces, BlackPieces } = getPieces(movePiece);

  console.log("RENDER??");
  // WhitePieces = Array.isArray(WhitePieces) ? WhitePieces : [];
  // BlackPieces = Array.isArray(BlackPieces) ? BlackPieces : [];
  let pieces = [...WhitePieces, ...BlackPieces];
  pieces.forEach((p) => (p.onClick = movePiece));
  const [chessPieces, setChessPieces] = useState([]);
  const [selected, setSelected] = useState(false);
  const [board, setBoard] = useState([]);
  useEffect(() => {
    setChessPieces(pieces);
  }, []);
  const MakeBoard = () => {
    let board = [];
    let isWhite = true;
    let child;
    for (let col = 0; col < width; col++) {
      for (let row = 0; row < width; row++) {
        child = placePiece({ col, row, movePiece });
        if (!child) {
          child = setAvailableMoves(availableMoves, row, col, selectedPiece);
        }
        board.push(
          <BoardSquare
            col={col}
            row={row}
            isWhite={isWhite}
            movePiece={movePiece}
            key={`${col}-${row}`}
          >
            {child}
          </BoardSquare>
        );
        isWhite = !isWhite;
      }
      isWhite = !isWhite;
    }
    return board;
  };

  const setAvailableMoves = (movesArray, row, col, from) => {
    let _availMove;
    movesArray.forEach((m) => {
      if (m.newX === col && m.newY === row) {
        console.log("AVAIL MOVE");
        let to = { x: m.newX, y: m.newY };
        _availMove = (
          <div onClick={() => moveFromTo(from, to)} className="available-move">
            {" "}
            X{" "}
          </div>
        );
      }
    });

    return _availMove;
  };

  const moveFromTo = (from, to) => {
    console.log({ from, to });
    chessPieces.forEach((p, iP) => {
      if (p.props.x === from.x && p.props.y === from.y) {
        console.log(p);
        console.log(p.props);
        // p.props.x = 0
        // pieces.splice(iP, 1);
        let movedPiece = chessPieces.splice(iP, 1)[0];
        console.log(movedPiece);
        let updatedPiece = getNewPiece({
          ...movedPiece.props,
          ...to,
        });
        console.log(chessPieces.length);
        chessPieces.push(updatedPiece);
        console.log(chessPieces.length);
        setChessPieces(chessPieces);
        clearAvailableMoves();
        setBoard(MakeBoard());
      }
    });
  };
  const placePiece = ({ col, row }) => {
    let _piece;
    chessPieces.forEach((piece) => {
      let { x, y } = piece.props;
      if (x === col && y === row) {
        _piece = piece;
      }
    });
    return _piece;
  };

  useEffect(() => {
    setBoard(MakeBoard());
    return () => {};
  }, [availableMoves, chessPieces]);

  return <div className="ChessBoard">{board}</div>;
}

const BoardSquare = ({ movePiece, children, isWhite, col, row }) => {
  const [xyCoords, setXyCoords] = useState({ x: col, y: row });

  return (
    <Square movePiece={movePiece} color={isWhite ? 1 : 0}>
      {children}
    </Square>
  );
};

const Square = styled.div`
  vertical-align: top;
  display: inline-flex;
  font-size: 2em;
  position: relative;
  width: 50px;
  height: 50px;
  background-color: ${(props) => (props.color ? "#ccc" : "#333")};
  color: ${(props) => (props.isWhite  ? "#000" : "white")};
`;
