
export const enum Players {
  Player1 = 'Player 1',
  Player2 = 'Player 2',
}

export type PlayersEnum = keyof typeof Players;

export const enum PieceState {
  X = 'X',
  O = 'O',
}

export type PieceStateEnum = keyof typeof PieceState;
