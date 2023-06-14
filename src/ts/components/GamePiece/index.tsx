// import { useState } from 'react';
import { Box, Button } from 'grommet';

import { PieceState, Players } from 'Types/app';

export interface GamePieceProps {
  id: string;
  currentTurn: Players | null;
  value: PieceState | null;
  onPieceClick: (id: string) => void;
};

/**
 * Creates a GamePiece for Tic Tac Toe
 * @return {JSX.Element}
 * @function
 */
export default function GamePiece({
  id,
  currentTurn,
  value,
  onPieceClick,
}: GamePieceProps): JSX.Element {

  const onSelectPiece = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    const element: Element = event.target as Element;
    const { innerHTML } = element;

    if (innerHTML || value) {
      // there's a value - this should be happening
      return;
    }

    onPieceClick(id);
  };

  return (
    <Box
      align="center"
      background="trueWhite"
      fill
      gridArea={id}
      id={`piece-container-${id}`}
      justify="center"
    >
      {currentTurn === null && value === null && (
        <Button
          primary
          fill
          color='mediumGrey'
          disabled={true}
          label={value}
          size='xxlarge'
        />
      )}

      {currentTurn !== null && value === null && (
        <Button
          secondary
          fill
          color='purple'
          disabled={false}
          label={value}
          size='xxlarge'
          onClick={onSelectPiece}
        />
      )}

      {value !== null && (
        <Button
          primary
          fill
          color={(value === PieceState.X) ? 'blue' : 'red'}
          disabled={false}
          label={value}
          size='xxlarge'
          onClick={onSelectPiece}
        />
      )}
    </Box>
  );
}
