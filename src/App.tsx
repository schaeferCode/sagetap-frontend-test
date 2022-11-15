import { useState } from 'react';

import { ArtItem } from './components/ArtItem';
import './App.css';

const initialArtList = [
  { id: 27992, disabled: false },
  { id: 27998, disabled: false },
  { id: 27999, disabled: false },
  { id: 27997, disabled: true },
  { id: 27993, disabled: false },
];

export function App() {
  const [artList, setArtList] = useState<{ id: number, disabled: boolean }[]>(initialArtList)

  return (
    <div className="App">
      <h1>Art Rater</h1>
      {artList.map(({ id, disabled }) => (
        disabled || <ArtItem key={id} id={id} />
      ))}
    </div>
  );
}
