import React,{useState} from 'react'
import { useNavigate } from "react-router";

const Signup = (props) => {

    const [details, setdetails] = useState({name:"",email:"",password:""})
    let history=useNavigate() ;   
    const handleonclick=async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:4000/api/auth/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
      body: JSON.stringify({ name:details.name,email:details.email, password:details.password }),// this is like the body in thunder client

          });
          const json = await response.json();
          console.log(json)
          console.log(json.success)
          if(json.success){
            localStorage.setItem('token' , json.authtoken);
        props.showalert("Account created", "success : ")


            history("/login")

          }
          else{
        props.showalert("user already exists ", "danger : ")


            // alert("ehll")
          }

    }
    
    const onchange = (e) => {
        setdetails({ ...details, [e.target.name]: e.target.value })
    
      }
  return (
    <div>
     <div>
     <form onSubmit={handleonclick}>
  <div className="mb-3">
  <div className="mb-3">
    <label htmlFor="name" className="form-label">name</label>
    <input type="name" className="form-control" name ="name" value={details.name} onChange={onchange} minLength={5} id="name"required/>
  </div>
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email"name='email' value={details.email} onChange={onchange} aria-describedby="emailHelp"minLength={5} required/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" name ="password" value={details.password} onChange={onchange} minLength={5} id="password"required/>
  </div>


  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
    </div>
  )
}

export default Signup
