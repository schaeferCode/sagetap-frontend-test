import { useEffect, useState } from 'react';

function getArtwork(id: number) {
  return fetch('https://api.artic.edu/api/v1/artworks/' + id);
}

function getImageUrl(id: string | undefined) {
  if (!id) return false
  return 'https://www.artic.edu/iiif/2/' + id + '/full/843,/0/default.jpg'
}

type ArtWork = {
  data: {
    title: string
    artist_title: string
    image_id: string
    artist_display: string
  }
  rating: number
}

export function ArtItem({id}: { id: number }) {
  const [voted, setVoted] = useState<boolean>(false)
  const [artwork, setArtwork] = useState<ArtWork>()

  const submit = () => {
    console.log("Submitting!")
    /* 
    Please have the submit button POST to https://20e2q.mocklab.io/rating with the following payload:

      {
        "id": {#id},
        "rating": {#rating}
      }

    Where id is the artwork's id, and rating is the selected rating.

    The endpoint should return the following:

    {
      "message": "Success"
    }
    */
    fetch('https://20e2q.mocklab.io/rating', {
      body: JSON.stringify({
        id,
        rating: artwork?.rating
      }),
      method: "POST"
    })
  };

  
  useEffect(() => {
    getArtwork(id).then(r => r.json()).then(json => setArtwork(json))
  }, [id]);
  
  const handleButtonClick = (rating: number) => {
    return () => {
      setArtwork({...artwork, rating} as ArtWork)
      setVoted(true)
    }
  }
  
  return (
    <div className="item">
      <h2>{artwork?.data.title}</h2>
      <h3>{artwork?.data.artist_title}</h3>
      <img alt={artwork?.data.artist_display} style={ { width: 100 } } src={getImageUrl(artwork?.data.image_id) || ""} />
      <p>Rating: {artwork?.rating}</p>
      <button onClick={handleButtonClick(1)}>1</button>
      <button onClick={handleButtonClick(2)}>2</button>
      <button onClick={handleButtonClick(3)}>3</button>
      <button onClick={handleButtonClick(4)}>4</button>
      <button onClick={handleButtonClick(5)}>5</button>
      <button disabled={!voted} onClick={submit}>Submit</button>
    </div>
  )
}
