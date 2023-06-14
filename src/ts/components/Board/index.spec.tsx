import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Players } from 'Types/app';

import Board, { BoardProps } from './index';

describe('<Board />', () => {
  const mockSwitchTurnDispatchSpy = jest.fn();
  const mockSetWinnerDispatchSpy = jest.fn();
  let mockProps: BoardProps;

  beforeEach(() => {
    mockSwitchTurnDispatchSpy.mockReset();
    mockSetWinnerDispatchSpy.mockReset();

    mockProps = {
      currentGame: 0,
      currentTurn: Players.Player1,
      onTurnComplete: mockSwitchTurnDispatchSpy,
      onSetWinner: mockSetWinnerDispatchSpy,
    };
  });

  test('should render wrapper element', () => {
    render(<Board {...mockProps} />);

    const boardContainer = document.querySelector('#board-container');
    expect(boardContainer).toBeInTheDocument();
  });

  test('should render a game board', () => {
    render(<Board {...mockProps} />);

    const background = document.querySelector('#board-background');
    expect(background).toBeInTheDocument();
  });

  test('should render GamePiece children', () => {
    render(<Board {...mockProps} />);

    const gamePieces = document.querySelectorAll('div[id^="piece-container-"]');
    expect(gamePieces.length).toBe(9);
  });

  test('should be able to select GamePiece', async () => {
    const user = userEvent.setup();

    render(<Board {...mockProps} />);

    const button = document.querySelector('#piece-container-0-0 > button');
    expect(button).not.toBeNull();

    await user.click(button!!);

    expect(mockSwitchTurnDispatchSpy).toHaveBeenCalledWith(Players.Player2);
    expect(mockSetWinnerDispatchSpy).not.toHaveBeenCalled();
  });

  test('should check if board is full before winner was determined', async () => {
    const user = userEvent.setup();

    let button: Element;
    const {rerender} = render(
      <Board
        currentGame={0}
        currentTurn={Players.Player1}
        onTurnComplete={mockSwitchTurnDispatchSpy}
        onSetWinner={mockSetWinnerDispatchSpy}
      />
    );

    // button 0
    button = document.querySelector(`#piece-container-0-0 > button`)!!;
    await user.click(button);
    rerender(
      <Board
        currentGame={0}
        currentTurn={Players.Player2}
        onTurnComplete={mockSwitchTurnDispatchSpy}
        onSetWinner={mockSetWinnerDispatchSpy}
      />
    );

    // button 1
    button = document.querySelector(`#piece-container-0-1 > button`)!!
    await user.click(button);
    rerender(
      <Board
        currentGame={0}
        currentTurn={Players.Player1}
        onTurnComplete={mockSwitchTurnDispatchSpy}
        onSetWinner={mockSetWinnerDispatchSpy}
      />
    );

    // button 2
    button = document.querySelector(`#piece-container-0-2 > button`)!!
    await user.click(button);
    rerender(
      <Board
        currentGame={0}
        currentTurn={Players.Player2}
        onTurnComplete={mockSwitchTurnDispatchSpy}
        onSetWinner={mockSetWinnerDispatchSpy}
      />
    );

    // button 3
    await user.click(document.querySelector(`#piece-container-2-0 > button`)!!);
    rerender(
      <Board
        currentGame={0}
        currentTurn={Players.Player1}
        onTurnComplete={mockSwitchTurnDispatchSpy}
        onSetWinner={mockSetWinnerDispatchSpy}
      />
    );

    // button 4
    await user.click(document.querySelector(`#piece-container-2-1 > button`)!!);
    rerender(
      <Board
        currentGame={0}
        currentTurn={Players.Player2}
        onTurnComplete={mockSwitchTurnDispatchSpy}
        onSetWinner={mockSetWinnerDispatchSpy}
      />
    );

    // button 5
    await user.click(document.querySelector(`#piece-container-2-2 > button`)!!);
    rerender(
      <Board
        currentGame={0}
        currentTurn={Players.Player1}
        onTurnComplete={mockSwitchTurnDispatchSpy}
        onSetWinner={mockSetWinnerDispatchSpy}
      />
    );

    // button 6
    await user.click(document.querySelector(`#piece-container-1-0 > button`)!!);
    rerender(
      <Board
        currentGame={0}
        currentTurn={Players.Player2}
        onTurnComplete={mockSwitchTurnDispatchSpy}
        onSetWinner={mockSetWinnerDispatchSpy}
      />
    );

    // button 7
    await user.click(document.querySelector(`#piece-container-1-1 > button`)!!);
    rerender(
      <Board
        currentGame={0}
        currentTurn={Players.Player1}
        onTurnComplete={mockSwitchTurnDispatchSpy}
        onSetWinner={mockSetWinnerDispatchSpy}
      />
    );

    // button 8
    await user.click(document.querySelector(`#piece-container-1-2 > button`)!!);

    expect(mockSwitchTurnDispatchSpy).toHaveBeenLastCalledWith(null);
    expect(mockSetWinnerDispatchSpy).not.toHaveBeenCalled();
  });

  test('should check for winner by row -', async () => {
    const user = userEvent.setup();

    render(<Board {...mockProps} />);

    // so many buttons
    const button1 = document.querySelector('#piece-container-0-0 > button');
    const button2 = document.querySelector('#piece-container-0-1 > button');
    const button3 = document.querySelector('#piece-container-0-2 > button');

    // null checks
    expect(button1).not.toBeNull();
    expect(button2).not.toBeNull();
    expect(button3).not.toBeNull();

    await user.click(button1!!);
    await user.click(button2!!);
    await user.click(button3!!);

    expect(mockSwitchTurnDispatchSpy).toHaveBeenLastCalledWith(null);
    expect(mockSetWinnerDispatchSpy).toHaveBeenCalled();
  });

  test('should check for winner by column |', async () => {
    const user = userEvent.setup();

    render(<Board {...mockProps} />);

    // so many buttons
    const button1 = document.querySelector('#piece-container-0-0 > button');
    const button2 = document.querySelector('#piece-container-1-0 > button');
    const button3 = document.querySelector('#piece-container-2-0 > button');

    // null checks
    expect(button1).not.toBeNull();
    expect(button2).not.toBeNull();
    expect(button3).not.toBeNull();

    await user.click(button1!!);
    await user.click(button2!!);
    await user.click(button3!!);

    expect(mockSwitchTurnDispatchSpy).toHaveBeenLastCalledWith(null);
    expect(mockSetWinnerDispatchSpy).toHaveBeenCalled();
  });

  test('should check for winner by diagonal \\', async () => {
    const user = userEvent.setup();

    render(<Board {...mockProps} />);

    // so many buttons
    const button1 = document.querySelector('#piece-container-0-0 > button');
    const button2 = document.querySelector('#piece-container-1-1 > button');
    const button3 = document.querySelector('#piece-container-2-2 > button');

    // null checks
    expect(button1).not.toBeNull();
    expect(button2).not.toBeNull();
    expect(button3).not.toBeNull();

    await user.click(button1!!);
    await user.click(button2!!);
    await user.click(button3!!);

    expect(mockSwitchTurnDispatchSpy).toHaveBeenLastCalledWith(null);
    expect(mockSetWinnerDispatchSpy).toHaveBeenCalled();
  });

  test('should check for winner by diagonal /', async () => {
    const user = userEvent.setup();

    render(<Board {...mockProps} />);

    // so many buttons
    const button1 = document.querySelector('#piece-container-0-2 > button');
    const button2 = document.querySelector('#piece-container-1-1 > button');
    const button3 = document.querySelector('#piece-container-2-0 > button');

    // null checks
    expect(button1).not.toBeNull();
    expect(button2).not.toBeNull();
    expect(button3).not.toBeNull();

    await user.click(button1!!);
    await user.click(button2!!);
    await user.click(button3!!);

    expect(mockSwitchTurnDispatchSpy).toHaveBeenLastCalledWith(null);
    expect(mockSetWinnerDispatchSpy).toHaveBeenCalled();
  });
});
