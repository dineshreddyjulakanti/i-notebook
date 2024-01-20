import './App.css';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About';
import Notestate from './context/notes/Notestate';
import Welcomepage from './components/Welcomepage';
import Hhome from './components/Hhome';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

function App() {
  const[alert,setalert]=useState(null);
  const showalert=(mess,type)=>{
    setalert({
      mess:mess,
      type:type 
    })
    setTimeout(()=>{
      setalert(null);
    },1500)
  }
  return (
    <>
      <Notestate>
        <Navbar  showalert={showalert} />
        <div className='container'>
        <Alert alert={alert}/>
          <Routes>
            <Route exact path='/' element={<Welcomepage />} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/home' element={<Hhome showalert={showalert}/>} />
            <Route exact path='/login' element={<Login showalert={showalert}/>} />
            <Route exact path='/signup' element={<Signup showalert={showalert}/>} />
          </Routes>
        </div>
      </Notestate>
    </>
  );
}

export default App;
