import { render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  test('should render Grommet wrapper', () => {
    render(<App />);

    const grommetWrapper = document.querySelector('div[class^="StyledGrommet"]');
    expect(grommetWrapper).toBeInTheDocument();
  });

  test('should render game board', () => {
    render(<App />);

    const boardContainer = document.querySelector('#board-container');
    expect(boardContainer).toBeInTheDocument();
  });

  test('should render information bar', () => {
    render(<App />);

    const infoContainer = document.querySelector('#information-bar-container');
    expect(infoContainer).toBeInTheDocument();
  });
});
