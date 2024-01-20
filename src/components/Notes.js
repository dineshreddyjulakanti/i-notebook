import React, { useContext, useEffect, useRef, useState } from 'react'
import contextvalue from '../context/notes/context';
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from "react-router";


// Role ->This gives u the assigned values of the NoteItem form the 'context'(NoteState)
const Notes = (props) => {
const {showalert}=props
let history=useNavigate() ;   

  const context = useContext(contextvalue);// for useing context 
  const { notes, getnote,editnote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
    getnote();
  }
  else{
    history("/login")

    
  }

    // eslint-disable-next-line
  }, [])
  const updatenote = (currentnote) => {
    setNote({id:currentnote._id,etitle:currentnote.title , edescription:currentnote.description , etag:currentnote.tag})
    ref.current.click(); // once idhi comment chesi chudu code //it is nothing closing the tab after clicking it  
  }
  const ref = useRef(null)// it is  used for the toggleing method
  const refclose = useRef(null)



  const [Note, setNote] = useState({id:"" ,etitle: "", edescription: "", etag: "" })
  // const { addnote } = context;
  const handleonsubmit = (e) => {
    e.preventDefault()
    editnote(Note.id,Note.etitle,Note.edescription,Note.etag);
    props.showalert("Text edited  ", "success : ")

    refclose.current.click();
    
    // console.log("updating.",Note)
    // addnote(Note.title, Note.description, Note.tag);
  }
  const onchange = (e) => {
    setNote({ ...Note, [e.target.name]: e.target.value })

  }
  return (
    <>
      <Addnote showalert={showalert} ></Addnote>

      <>

        <button ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {/* Eform  */}
                <form className='container my-3'>
                  <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">eTitle</label>
                    <input type="text" className="form-control" id="etitle" name='etitle' value= {Note.etitle} aria-describedby="emailHelp" onChange={onchange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">Description</label>
                    <input type="text" className="form-control" id="edescription" name="edescription"  value= {Note.edescription} onChange={onchange}  />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="etag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" name="etag"  value= {Note.etag} onChange={onchange} />
                  </div>
                </form>

              </div>
              <div className="modal-footer">
                <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" disabled={Note.etitle.length<5||Note.edescription.length<5} onClick={handleonsubmit} className="btn btn-primary">Edit</button>
              </div>
            </div>
          </div>
        </div>
      </>
      <div className='row my-3'>
        <h1>You Notes</h1>
        <div className='container mx-2'>
        {notes.length===0&&"No notes to display"}
        </div>  
        {
          notes.length!=0&&notes.map((note) => {                   // This is the syntax of the context
            return <Noteitem key={note._id} updatenote={updatenote} showalert={showalert} note={note} />
          }
          )}
      </div>
    </>
  )
}
export default Notes
