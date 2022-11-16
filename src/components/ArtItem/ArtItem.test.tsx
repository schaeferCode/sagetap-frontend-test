import { render, screen } from '@testing-library/react';

import { ArtItem } from './'

describe('ArtItem', () => {
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
  it('submit button is disabled until rating is selected', async () => {
    render(<ArtItem id={12345} handleRemoveClick={(e: any) => null} />)
    await screen.findByText('artist_title')

    const submit = screen.getByText('Submit')
    expect(submit).toHaveAttribute('disabled')

    const ratingButton = screen.getByText('1')
    ratingButton.click()
    expect(await screen.findByText('Submit')).not.toHaveAttribute('disabled')
  })

  it('clicking numbered button updates rating display below image to be that number', async () => {
    render(<ArtItem id={12345} handleRemoveClick={(e: any) => null} />)
    await screen.findByText('artist_title')

    const firstRatingButton = screen.getByText('1')
    firstRatingButton.click()
    
    let rating = await screen.findByText('Rating: ', { exact: false })
    expect(rating).toHaveTextContent('Rating: 1')
    
    const SecondRatingButton = screen.getByText('2')
    SecondRatingButton.click()
    
    rating = await screen.findByText('Rating: ', { exact: false })
    expect(rating).toHaveTextContent('Rating: 2')
  });

  it('clicking submit POSTs update, displays a toast success message, hides buttons', async () => {
    fetchMock.mockOnce("Hurray!")
    render(<ArtItem id={12345} handleRemoveClick={(e: any) => null} />)
    await screen.findByText('artist_title')

    const firstRatingButton = screen.getByText('1')
    firstRatingButton.click()
    const submit = await screen.findByText('Submit')
    submit.click()

    expect(await screen.findByText('Rating submission was successful')).toBeInTheDocument()
    expect(screen.queryByText('Submit')).toHaveClass('invisible')
    expect(screen.queryByText('1')).toHaveClass('disabled:invisible')
  });
})

