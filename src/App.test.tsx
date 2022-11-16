import { render, screen , fireEvent } from '@testing-library/react';
import { App } from './App';

test('has title', () => {
  render(<App />);
  const title = screen.getByText("Art Rater");
  expect(title).toBeInTheDocument();
});
