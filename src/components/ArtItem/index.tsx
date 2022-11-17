import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LOADING_STATUS } from '../../App';

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

type ArtItemProps = {
  id: number
  handleRemoveClick(id: number): void
  setLoadingStatus(loadingStatus: LOADING_STATUS): void
}

export function ArtItem({id, handleRemoveClick, setLoadingStatus}: ArtItemProps) {
  const [voted, setVoted] = useState<boolean>(false)
  const [artwork, setArtwork] = useState<ArtWork>()
  const [hasRated, setHasRated] = useState(false)

  const submit = () => {
    console.log("Submitting!")
    setLoadingStatus(LOADING_STATUS.LOADING)
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
    }).then(() => {
      toast('Rating submission was successful');
      setHasRated(true)
      setLoadingStatus(LOADING_STATUS.FINISHED)
    }).catch(() => {
      setLoadingStatus(LOADING_STATUS.FAILED)
    })
  };

  
  useEffect(() => {
    setLoadingStatus(LOADING_STATUS.LOADING)
    getArtwork(id).then((r) => {
      if (r.status !== 200) throw new Error("Not VALID!");
      return r.json()
    }).then((json) => {
      setArtwork(json)
      setLoadingStatus(LOADING_STATUS.FINISHED)
    }).catch(() => {
      setLoadingStatus(LOADING_STATUS.FAILED)
    })
  }, [id]);
  
  const handleButtonClick = (rating: number) => {
    return () => {
      setArtwork({...artwork, rating} as ArtWork)
      setVoted(true)
    }
  }
  
  return (
    <li className="flex flex-col items-center border border-solid border-gray-70 p-5 shadow-md">
      <h2 className="font-bold">{artwork?.data.title}</h2>
      <h3 className="italic">{artwork?.data.artist_title}</h3>
      <img className="w-full h-full object-cover" alt={artwork?.data.artist_display} src={getImageUrl(artwork?.data.image_id) || ""} />
      <p>Rating: {artwork?.rating}</p>
      <div className="flex space-x-4">
        <button disabled={hasRated} className="btn-primary disabled:invisible" onClick={handleButtonClick(1)}>1</button>
        <button disabled={hasRated} className="btn-primary disabled:invisible" onClick={handleButtonClick(2)}>2</button>
        <button disabled={hasRated} className="btn-primary disabled:invisible" onClick={handleButtonClick(3)}>3</button>
        <button disabled={hasRated} className="btn-primary disabled:invisible" onClick={handleButtonClick(4)}>4</button>
        <button disabled={hasRated} className="btn-primary disabled:invisible" onClick={handleButtonClick(5)}>5</button>
        <button disabled={!voted} className={`btn-primary disabled:btn-primary__disabled ${hasRated ? 'invisible' : ''}`} onClick={submit}>Submit</button>
        <button className="btn-primary" onClick={() => handleRemoveClick(id)}>Remove</button>
      </div>
      <ToastContainer
        data-testid="toast"
        position="top-center"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </li>
  )
}
