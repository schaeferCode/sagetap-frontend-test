import { useState, FormEventHandler, Suspense } from 'react';

import { ArtItem } from './components/ArtItem';

const initialArtList = [
  { id: 27992, disabled: false },
  { id: 27998, disabled: false },
  { id: 27999, disabled: false },
  { id: 27997, disabled: true },
  { id: 27993, disabled: false },
];

export function App() {
  const [artList, setArtList] = useState<{ id: number, disabled: boolean }[]>(initialArtList)
  const [newArtID, setNewArtID] = useState<string>()

  const handleRemoveClick = (artID: number) => {
    const relevantArtIndex = artList.findIndex(({id}) => id === artID)
    if (relevantArtIndex > -1) {
      artList[relevantArtIndex].disabled = true
      setArtList([...artList])
    }
  }

  const addArt: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    if (newArtID) {
      artList.push({ id: parseInt(newArtID), disabled: false })
      setArtList([...artList])
    }
  }

  return (
    <Suspense fallback={}>
      <div className="flex flex-col items-center m-10">
        <h1 className="text-4xl mb-5">Art Rater</h1>
        <ul className="grid gap-4 grid-cols-2">
          {artList.map(({ id, disabled }) => (
            disabled || <ArtItem key={id} id={id} handleRemoveClick={handleRemoveClick} />
          ))}
        </ul>
        <form className="w-full flex justify-center sticky bottom-0 bg-gray-300 h-20 items-center" onSubmit={addArt}>
          <label>
            Enter Art ID:
            <input className='mx-3' onChange={(e) => setNewArtID(e.target.value)} placeholder="e.g. 29443" />
          </label>
          <button disabled={!newArtID} className='btn-primary max-h-10 disabled:btn-primary__disabled'>Submit</button>
        </form>
      </div>
    </Suspense>
  );
}
