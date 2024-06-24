import React, { useEffect, useState } from 'react';
import { Draggable } from 'react-drag-reorder';

function Test() {
  const [words, setWords] = useState(["Hello", "Hi", "How are you", "Cool"]);

  const getChangedPos = (currentPos, newPos) => {
    const updatedWords = [...words];
    const [removed] = updatedWords.splice(currentPos, 1); // Remove the dragged item
    updatedWords.splice(newPos, 0, removed); // Insert the item at the new position
    setWords(updatedWords); // Update the state with the new order
   
  };

  useEffect(()=>{
    console.log(words)
  },[words]);
  return (
    <div>
      <h3>Original List:</h3>
      <Draggable onPosChange={getChangedPos}>
        {words.map((word, idx) => (
          <div key={idx} className="flex-item">
            {word}
          </div>
        ))}
      </Draggable>
      
    </div>
  );
}

export default Test;
