import React, { useState, Component } from "react";
import Board from "./Board.js";
import { getPieces, getNewPiece } from "./PiecesComponents.js";

export default class Game extends Component {
  constructor() {
    super();
    this.movePiece = this.movePiece.bind(this);
    this.clearAvailableMoves = this.clearAvailableMoves.bind(this)
    this.state = {
      availableMoves: [],
      selectedPiece: { x: undefined, y: undefined },
    };
  }

  clearAvailableMoves(){
    this.setState({availableMoves:[]})
  }

  movePiece({ name, x, y, moves }) {
    console.log("click to move " + name);
    let newMoves = [];
    moves.forEach((move) => {
      let newX = x + move[0];
      let newY = y + move[1];
      if (newX >= 0 && newX <= 7 && newY >= 0 && newY <= 7) {
        console.log({ newY, newX });
        newMoves.push({ newX, newY });
      }
    });

    this.setState({
      availableMoves: newMoves,
      selectedPiece: { x, y },
    });
  }
  render() {
    console.log(this.state.selectedPiece);
    return (
      <div>
        <Board
          clearAvailableMoves={this.clearAvailableMoves}
          selectedPiece={this.state.selectedPiece}
          availableMoves={this.state.availableMoves}
          getPieces={getPieces}
          movePiece={this.movePiece}
          getNewPiece={getNewPiece}
        />
      </div>
    );
  }
}
