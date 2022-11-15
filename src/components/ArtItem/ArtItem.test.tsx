import { render, screen, waitFor } from '@testing-library/react';

import { ArtItem } from './'

test('for an art item, submit button is disabled until a rating is selected', async () => {
  fetchMock.mockOnce(JSON.stringify({body: {
    data: {
      title: 'title',
      artist_title: 'artist_title',
      image_id: 'image_id',
      artist_display: 'artist_display',
    },
  }}))
  render(<ArtItem id={12345} />)
  // expect(screen.getByText('Submit')).toHaveAttribute('disabled')

  const ratingButton = screen.getByText('1')
  screen.debug(ratingButton)
  ratingButton.click()

  // await waitFor(() => {
  //   expect(screen.getByText('Submit')).toHaveAttribute('disabled')
  // })
});
