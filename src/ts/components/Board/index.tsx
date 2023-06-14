import { useEffect, useState } from 'react';
import { Box, Grid } from 'grommet';

import GamePiece from 'Components/GamePiece';
import { PieceState, Players } from 'Types/app';

// 3 x 3 matrix
const MATRIX_SIZE = 3;
const makeEmptyBoard = () => Array.from({ length: MATRIX_SIZE }, (_) => makeEmptyRow());
const makeEmptyRow = () => Array.from({ length: MATRIX_SIZE }, (_) => null);
const boardKeys = makeEmptyBoard()
  .map((row: Array<PieceState | null>, rowIndex) => row.map((_, colIndex) => `${rowIndex}.${colIndex}`))
  .flat();

export interface BoardProps {
  currentGame: number;
  currentTurn: Players | null;
  onTurnComplete: (action: Players | null | ((prevState: Players | null) => Players | null)) => void;
  onSetWinner: (action: Players | null | ((prevState: Players | null) => Players | null)) => void;
  // onSelectPiece: (id: string) => void;
};

/**
 * Creates a Tic Tac Toe board and handles game logic
 * @return {JSX.Element}
 * @function
 */
export default function Board({
  currentGame,
  currentTurn,
  onTurnComplete,
  onSetWinner,
}: BoardProps): JSX.Element {
  const [board, updateBoard] = useState<Array<PieceState | null>[]>(makeEmptyBoard());

  useEffect(() => {
    // game changed - make a new board
    updateBoard(makeEmptyBoard());
  }, [currentGame]);

  const onSelectPiece= (id: string) => {
    const idParts = id.split('-').map((str) => Number.parseInt(str, 10));
    const [row, col] = idParts;
    const cellValue = (currentTurn === Players.Player1) ? PieceState.X : PieceState.O;

    const newMatrix = structuredClone(board);
    newMatrix[row][col] = cellValue;

    updateBoard(newMatrix);

    // todo: check for winning conditions
    const validationMethod = (value: PieceState | null) => value === cellValue;

    // checking row of selected piece
    const isRow = newMatrix[row].every(validationMethod);

    // checking col of selected piece
    const isColumn = [newMatrix[0][col], newMatrix[1][col], newMatrix[2][col]].every(validationMethod);

    // checking diagonal of selected piece
    const LTR = [newMatrix[0][0], newMatrix[1][1], newMatrix[2][2]].every(validationMethod);

    // checking diagonal of selected piece
    const RTL = [newMatrix[0][2], newMatrix[1][1], newMatrix[2][0]].every(validationMethod);

    // validate
    if(isRow || isColumn || LTR || RTL) {
      onSetWinner(currentTurn);
      onTurnComplete(null);
      return
    }

    // check board full
    if (newMatrix.every((arr) => arr.every((v) => v))) {
      // there is a value in every cell - and no winner as of yet
      onTurnComplete(null);
      return;
    }

    const nextTurn = (currentTurn === Players.Player1) ? Players.Player2 : Players.Player1;
    onTurnComplete(nextTurn);
  }

  return (
    <Box
      fill
      align="center"
      id="board-container"
      justify="center"
      >
        <Box
          background="mediumGrey"
        >
          <Grid
            areas={[boardKeys]}
            border={true}
            columns={['small', 'small', 'small']}
            gap="small"
            id="board-background"
            rows={['small', 'small', 'small']}
          >
            {
              board.map(
                (row, rowIndex) => row.map(
                  (pieceVal, pieceIndex) => (
                    <GamePiece
                      key={`${rowIndex}-${pieceIndex}`}
                      id={`${rowIndex}-${pieceIndex}`}
                      value={pieceVal}
                      currentTurn={currentTurn}
                      onPieceClick={onSelectPiece}
                    />
                  )
                )
              )
            }
          </Grid>
        </Box>
    </Box>
  );
}
