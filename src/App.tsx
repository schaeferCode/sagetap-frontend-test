 /* eslint-disable */

import React, { useEffect, useState } from 'react';
import './App.css';

async function getArtwork(id: number) {
  return fetch('https://api.artic.edu/api/v1/artworks/' + id);
}

function getImageUrl(id: string) {
  return 'https://www.artic.edu/iiif/2/' + id + '/full/843,/0/default.jpg'
}

function ArtItem(props: any) {
  const [voted, setVoted] = useState<boolean>(false)
  const [artwork, setArtwork] = useState<any>(null)

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
    return () => {};
  };

  if (props.disabled)
  {
    return <></>;
  }
  
  useEffect( () => {
    getArtwork(props.id).then(r => r.json()).then(json => setArtwork(json))
  }, []);

  return (
    <div className="item">
        <h2>{artwork && artwork.data.title}</h2>
        <h3>{artwork && artwork.data.artist_title}</h3>
        <img style={ { width: 100 } } src={artwork != null ? getImageUrl(artwork.data.image_id) : ""} />
        <p>Rating: {artwork && artwork.rating}</p>
        <button onClick={() => { artwork.rating = 1; setVoted(true); }}>1</button>
        <button onClick={() => { artwork.rating = 2; setVoted(true); }}>2</button>
        <button onClick={() => { artwork.rating = 3; setVoted(true); }}>3</button>
        <button onClick={() => { artwork.rating = 4; setVoted(true); }}>4</button>
        <button onClick={() => { artwork.rating = 5; setVoted(true); }}>5</button>
        <button onClick={submit()}>Submit</button>
    </div>
  )
}

function App() {
  const [arts, setArts] = useState<any>([])
  
  const a = [
    { id: 27992, disabled: false },
    { id: 27998, disabled: false },
    { id: 27999, disabled: false },
    { id: 27997, disabled: true },
    { id: 27993, disabled: false },
  ];

  useEffect(() => {
    const temp = []
    for (let i = 0; i < a.length; i++) {
      temp.push(<ArtItem id={a[i].id} disabled={a[i].disabled}></ArtItem>)
    }
    setArts(temp)
  }, [setArts])

  return (
    <div className="App">
      <h1>Art Rater</h1>
      {arts}
    </div>
  );
}

export {App, ArtItem};
