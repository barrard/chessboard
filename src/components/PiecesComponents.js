import react, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  knightMoves,
  pawnMoves,
  kingMoves,
  queenMoves,
  bishopMoves,
  rookMoves,
} from "./Moves.js";



export const getNewPiece = ({name, x, y, movePiece, color})=>{
  
 return <ChessPiece
  movePiece={movePiece}
  color={color}
  name={name}
  y={y}
  x={x}
/>

}

const ChessPiece = ({ movePiece, color, name, x, y }) => {
  const [moves, setMoves] = useState([]);
  const [coords, setCoords] = useState({x, y})
  const [team, setTeam] = useState(color)

  useEffect(() => {
    let moves = getMoves(name);
    setMoves(moves);

    return () => {};
  }, []);
  return (
    <Piece
      onClick={(e) => movePiece({ name, x, y, moves })}
      color={color}
    >
      <>
        {color === "black" ? blackPieces[name] : whitePieces[name]}
        <Coords>
          {x},{y}
        </Coords>
      </>
    </Piece>
  );
};

let whitePieces = {
  king: <>&#9812;</>,
  queen: <>&#9813;</>,
  rook: <>&#9814;</>,
  bishop: <>&#9815;</>,
  knight: <>&#9816;</>,
  pawn: <>&#9817;</>,
};

let blackPieces = {
  king: <>&#9818;</>,
  queen: <>&#9819;</>,
  rook: <>&#9820;</>,
  bishop: <>&#9821;</>,
  knight: <>&#9822;</>,
  pawn: <>&#9823;</>,
};

export const getPieces = (movePiece) => {
  const WhitePieces = [
    ...AllPawns("white", movePiece),
    ...AllKnights("white", movePiece),
  ];

  const BlackPieces = [
    ...AllPawns("black", movePiece),
    ...AllKnights("black", movePiece),
  ];

  return { WhitePieces, BlackPieces };
};

const Piece = styled.div`
  cursor: pointer;
  font-size: 40px;
  position: absolute;
  width: 10px;
  height: 10px;
  left: 20%;
  bottom: 60%;
  text-shadow: ${({ color }) => (color !== "black" ? "1px 1px 1px #000" : "1px 1px 1px #fff" )};
  color: ${({ color }) => color};
  user-select: none;
`;

const Coords = styled.span`
  font-size: 2px;
  padding: 0px;
`;

function getMoves(name) {
  switch (name) {
    case "pawn":
      return pawnMoves;
      break;

    case "knight":
      return knightMoves;
      break;

    case "queen":
      return queenMoves;
      break;

    case "rook":
      return rookMoves;
      break;

    case "bishop":
      return bishopMoves;
      break;
    case "king":
      return kingMoves;
      break;

    default:
      break;
  }
}

function AllKnights(color, movePiece) {
  let knights = [];
  let knightCount = 2;
  let knight;
  while (knightCount >= 0) {
    if (color === "white") {
      knight = (
        <ChessPiece
          movePiece={movePiece}
          color={color}
          name={"knight"}
          y={knightCount % 2 ? 1 : 6}
          x={7}
        />
      );
    } else {
      knight = (
        <ChessPiece
          movePiece={movePiece}
          color={color}
          name={"knight"}
          y={knightCount % 2 ? 1 : 6}
          x={0}
        />
      );
    }

    knightCount--;
    knights.push({ ...knight });
  }
  return knights;
}
function AllPawns(color, movePiece) {
  let pawns = [];
  let pawnCount = 7;
  let pawn;
  while (pawnCount >= 0) {
    if (color === "white") {
      pawn = (
        <ChessPiece
          movePiece={movePiece}
          color={color}
          name={"pawn"}
          y={pawnCount}
          x={6}
        />
      );
    } else {
      pawn = (
        <ChessPiece
          movePiece={movePiece}
          color={color}
          name={"pawn"}
          y={pawnCount}
          x={1}
        />
      );
    }

    pawnCount--;
    pawns.push({ ...pawn });
  }
  return pawns;
}
