import { render } from '@testing-library/react';

import { Players } from 'Types/app';
import InformationBar, { InformationBarProps } from './index';

describe('<InformationBar />', () => {
  const mockResetSpy = jest.fn();
  let mockProps: InformationBarProps;

  beforeEach(() => {
    mockResetSpy.mockReset();
    mockProps = {
      currentTurn: Players.Player1,
      winner: null,
      onNewGame: mockResetSpy,
    };
  });

  test('should render wrapper element', () => {
    render(<InformationBar {...mockProps} />);

    const infoContainer = document.querySelector('#information-bar-container');
    expect(infoContainer).toBeInTheDocument();
  });

  test('should render Player Turn information', () => {
    render(<InformationBar {...mockProps} />);

    const header = document.querySelector('#information-bar-container > h1');
    expect(header).toBeInTheDocument();
  });

  test('InformationBar should render winner information', () => {
    const props = mockProps;
    props.currentTurn = null;
    props.winner = Players.Player1;

    render(<InformationBar {...props} />);

    const header = document.querySelector('#information-bar-container > h1');
    const copy = document.querySelector('#information-bar-container > span');

    expect(header).toBeInTheDocument();
    expect(header?.innerHTML).toBe('Player 1 Wins!');
    expect(copy).toBeInTheDocument();
  });

  test('InformationBar should render no winner element', () => {
    const props = mockProps;
    props.currentTurn = null;

    render(<InformationBar {...props} />);

    const header = document.querySelector('#information-bar-container > h1');
    const copy = document.querySelector('#information-bar-container > span');

    expect(header).toBeInTheDocument();
    expect(header?.innerHTML).toBe('Nobody Wins!');
    expect(copy).toBeInTheDocument();
  });

  test('InformationBar should render new game elements', () => {
    const props = mockProps;
    props.currentTurn = null;

    render(<InformationBar {...props} />);

    const newGameContainer = document.querySelector('#new-game');
    expect(newGameContainer).toBeInTheDocument();
  });
});
