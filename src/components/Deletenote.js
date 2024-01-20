import React, { useContext, useState } from 'react'
import contextvalue from '../context/notes/context';

const Deletenote = () => {
    const context = useContext(contextvalue);// for useing context 
    const { addnote } = context;

  return (
    <div>
      
    </div>
  )
}

export default Deletenote
