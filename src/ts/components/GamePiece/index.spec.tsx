import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import GamePiece, { GamePieceProps } from './index';
import { PieceState, Players } from 'types/app';

describe('<GamePiece />', () => {
  const mockClickSpy = jest.fn();
  let mockProps: GamePieceProps;

  beforeEach(() => {
    mockClickSpy.mockReset();
    mockProps = {
      id: '1-1',
      currentTurn: Players.Player1,
      value: null,
      onPieceClick: mockClickSpy,
    };
  });

  test('should render wrapper element', () => {
    render(<GamePiece {...mockProps} />);

    const pieceContainer = document.querySelector(`#piece-container-${mockProps.id}`);
    expect(pieceContainer).toBeInTheDocument();
  });

  test('should render button element', () => {
    const { getByRole } = render(<GamePiece {...mockProps} />);

    const button = getByRole('button');
    expect(button).toBeInTheDocument();
  });

  test('should render disabled empty button element', () => {
    const props = mockProps;
    props.currentTurn = null;

    const { getByRole } = render(<GamePiece {...props} />);

    const button = getByRole('button');
    expect(button).toBeDisabled();
  });

  test('should call supplied click handler', async () => {
    const user = userEvent.setup();

    const { getByRole } = render(<GamePiece {...mockProps} />);

    const button = getByRole('button');
    await user.click(button);

    expect(mockClickSpy).toHaveBeenCalledWith(mockProps.id);
  });

  test('should not call supplied click handler', async () => {
    const user = userEvent.setup();

    const props = mockProps;
    props.value = PieceState.O;

    const { getByRole } = render(<GamePiece {...props} />);

    const button = getByRole('button');
    await user.click(button);

    expect(mockClickSpy).not.toHaveBeenCalled();
  });
});
