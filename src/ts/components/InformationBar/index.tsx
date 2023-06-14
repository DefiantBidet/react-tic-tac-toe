// import { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Text,
} from 'grommet';

import { Players } from 'Types/app';

export interface InformationBarProps {
  currentTurn: Players | null;
  winner: Players | null;
  onNewGame: () => void;
};

export default function InformationBar({
  currentTurn,
  winner,
  onNewGame
}: InformationBarProps): JSX.Element {

  const renderPlayerTurnInfo = () => <Heading margin="none">{`${currentTurn}'s turn.`}</Heading>;

  const renderEndGame = () => {
    const header = (winner) ? `${winner} Wins!` : 'Nobody Wins!';
    const message = (winner) ?
      'Unless you try to do something beyond what you have already mastered, you will never grow.'
     :
      'A strange game. The only winning move is not to play. How about a nice game of chess?';

      return (
      <>
        <Heading margin="none">{header}</Heading>
        <Text>{message}</Text>
        <Box
          id="new-game"
        >
          <Text>Play Again?</Text>
          <Button
            primary
            label="New Game"
            onClick={onNewGame}
          />
        </Box>
      </>
    );
  };

  return (
    <Box
      fill
      align="center"
      id="information-bar-container"
      justify="center"
    >
      {currentTurn && renderPlayerTurnInfo()}
      {!currentTurn && renderEndGame()}
    </Box>
  )
}
