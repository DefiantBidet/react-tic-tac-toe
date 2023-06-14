import { useState } from 'react';
import { Grommet } from 'grommet';

import Board from 'Components/Board';
import InformationBar from 'Components/InformationBar';

import { Players } from 'Types/app';

import applicationTheme from './theme';

/**
 * The main entry point of the Application.
 * @return {JSX.Element}
 * @function
 */
export default function App(): JSX.Element {
  const [playersTurn, switchTurn] = useState<Players | null>(Players.Player1);
  const [winner, setWinner] = useState<null | Players>(null);
  const [currentGame, updateGame] = useState<number>(0);

  const onResetGame = () => {
    setWinner(null);
    switchTurn(Players.Player1);
    updateGame(currentGame + 1);
  };

 return (
   <Grommet theme={applicationTheme}>
      <Board
        currentGame={currentGame}
        currentTurn={playersTurn}
        onTurnComplete={switchTurn}
        onSetWinner={setWinner}
      />
      <InformationBar currentTurn={playersTurn} winner={winner} onNewGame={onResetGame} />
    </Grommet>
  );
}

