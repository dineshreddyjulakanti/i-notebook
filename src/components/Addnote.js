import React, { useContext, useState } from 'react'
import contextvalue from '../context/notes/context';
const Addnote = (props) => {
    const [Note, setNote] = useState({ title: "", description: "", tag: "" })
    const context = useContext(contextvalue);// for useing context 
    const { addnote } = context;
    const handleSubmit = (e) => {
        e.preventDefault()
        addnote(Note.title, Note.description, Note.tag);
        props.showalert("Text Added  ", "success : ")

        setNote({ title: "", description: "", tag: "" });
    }
    const onchange = (e) => {
        setNote({ ...Note, [e.target.name]: e.target.value })

    }
    return (
        <div>
            <div className='container my-3'>
                <h1>Add Notes</h1>
                <form className='container my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp"value={Note.title} onChange={onchange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" value={Note.description}onChange={onchange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={Note.tag}onChange={onchange} />
                    </div>
                    <button disabled={Note.title.length<5||Note.description.length<5} type="submit" className="btn btn-primary" onClick={handleSubmit}>Addnote</button>
                </form>
                This is home
            </div>
        </div>
    )
}

export default Addnote
