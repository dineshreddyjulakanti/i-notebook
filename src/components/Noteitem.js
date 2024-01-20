import React,{useContext} from 'react'
import contextvalue from '../context/notes/context';
// Role->This gives u the details of the user(u can specify) ,which instail given in the Notestate.
const Noteitem = (props) => {
    const { note,updatenote} = props;
    const context = useContext(contextvalue);// for useing context 
    const { deletenote} = context;

    return (
        <div className='col-md-3'>
            <div className="card my-2 " >
                <div className="card-body">
                    <div className="d-flex align-items-center">
                    <h5 className="card-title">{note.title}</h5>
                    <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updatenote(note)}}></i> 
                    </div>
                    <p className="card-text">{note.description}</p>
                    {/* This is  delte and edit from font awesom  */}
                    <i className="fa-solid fa-trash mx-2" onClick={()=>{deletenote(note._id); props.showalert("Account deleted  ", "success : ")}}></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
