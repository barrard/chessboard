import styled from "styled-components";
import react, { useState, useEffect, useMemo, useCallback } from "react";

export default function MarkerMoves() {
  const WIDTH = 8;
  const [initialRender, setinitialRender] = useState(() => {
    return console.log("first render only?!");
  });
  const [val, setValue] = useState(0);
  const [markerCoords, setMarkerCoords] = useState({ x: 2, y: 1 });
  const [moveMarkers, setMoveMarkers] = useState([]);
  const [moves, setMoves] = useState([1, 2, 3]);
  const [board, setBoard] = useState(<></>);
  console.log("---------START MARKER MOVES---------");

  useEffect(() => {
    setBoard(makeBoard());
    console.log("Markers event");
  }, [markerCoords, moveMarkers]);

  useEffect(() => {
    console.log("---------END MARKER MOVES---------");
});
  useEffect(() => {
    console.log("use effect ONLY ONCE");
    let ar = []
    for(let x = 0; x <10;x++){
        ar.push(x)
    }
    setMoves(ar)
  }, []);

  function makeBoard() {
    console.log("makeBoard()");
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
                  isWhite={isWhite}
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
  const movesList = useMemo(() => (
    MakeMovesList({setValue:setValue,moves:moves})
  ));
  return (
    <Container>
      <input
        onChange={(e) => {
          console.log("onchange annonymous function");
          setinitialRender(e.target.value);
        }}
      />
      <ChessBoard>{board}</ChessBoard>
      {/* <ChessBoard>{makeBoard()}</ChessBoard> */}
      {movesList}
      {/* <MovesList /> */}

      {val}
    </Container>
  );
}

function MakeMovesList({ moves, setValue }) {
//   let cb = useCallback((move, iMove) => {
//       return (<MoveListItem key={iMove} move={move} />);
//     }, [moves])
  let movesList = moves.map(
      (move, iMove) => {
    return <MoveListItem key={iMove} move={move} setValue={setValue} />;
  }
  );

  return (
    <ListContainer>
      <h5> List of moves</h5>
      <List>{movesList}</List>
    </ListContainer>
  );
}

const MoveListItem = ({ move, setValue }) => {
  console.log("MoveListItem");
  useEffect(()=>{
    // let timer = setInterval(()=> console.log('val'), 1000)
        console.log('ITEM efect')
        // return ()=> clearInterval(timer)
        return ()=>console.log('Item unmounted?')
    })
  return (
    <>
      <ListItem>list item</ListItem>
      {/* <button onClick={() => setValue((val) => val + 1)}>SetVal</button> */}
    </>
  );
};
const Container = styled.div`
  display: flex;
`;
const ChessBoard = styled.div`
  /* left: 25%;
  position: relative; */
  max-width: 400px;
  border: 1px solid black;
  overflow: hidden;
  min-width: 400px;
`;
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

const MoveMarker = ({ isWhite, setMoveMarkers, setMarkerCoords, x, y }) => {
  return (
    <AvailableMove
      color={isWhite ? 1 : 0}
      onClick={() => {
        setMarkerCoords({ x, y });
        setMoveMarkers([]);
      }}
      className="available-move"
    >
      {" "}
      X{" "}
    </AvailableMove>
  );
};

const hoverShadow = "0px 0px 3px";
const AvailableMove = styled.div`
  &:hover {
    color: ${({ color }) => (color ? "white" : "black")};
    text-shadow: ${({ color }) =>
      color ? `${hoverShadow} black` : `${hoverShadow} white`};
  }
  color: ${({ color }) => (color ? "black" : "white")};

  cursor: pointer;
  text-shadow: 3px 2px 6px black;
  left: 25%;
  align-self: center;
  position: relative;
`;

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

const List = styled.ul`
  list-style: none;

  border: 1px solid red;
`;

const ListItem = styled.li`
  font-size: 20px;
  margin-left: -35px;
`;

const ListContainer = styled.div`
  /* position:absolute;
right:10%; */
  /* width: 25%; */
  border: 1px solid red;
`;
