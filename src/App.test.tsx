import { render, screen } from '@testing-library/react';
import { App } from './App';

beforeEach(() => {
  fetchMock.resetMocks()
  fetchMock.mockOnce(JSON.stringify({
    data: {
      title: 'title',
      artist_title: 'artist_title',
      image_id: 'image_id',
      artist_display: 'artist_display',
    },
  }))
})

test('has title', () => {
  render(<App />);
  const title = screen.getByText("Art Rater");
  expect(title).toBeInTheDocument();
});
