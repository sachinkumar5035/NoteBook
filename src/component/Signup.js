import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Signup = (props) => {

    const[credentials,setCredentials] = useState({name:"",email:"", password:""});
    
    let navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault(); // to reload the page
        console.log("onsubmit clicked");
        const {name,email,password,cpassword} = credentials;  // extract  name, email password and cpassword from creadentials
        // user login creds wali use krna h 
        // API call for createuser API => http://localhost:4000/api/auth/createuser no login required
        const response = await fetch("http://localhost:4000/api/auth/createuser", {
            method: 'POST',
            // header me content type hi dena h bs
            headers: {
              'Content-Type': 'application/json'
            }, 
            // API ki body me name, email and password dena h ki user register ho ske 
            // now we can use extracted name,email,password and cpassword from credentials
            body: JSON.stringify({name,email,password})
          });
          const json = await response.json();
          console.log(json);
          if(json.success){
            // save the credentials and redirect to home
            localStorage.setItem('token',json.authtoken);
            navigate("/"); // redirect to home page
            props.showAlert("user created successfully","success");
          }
          else{
                props.showAlert("Invalid details","danger");
          }
          
    }

    const onChange = (e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value});
    }


  return (
    <div className='container col-md-4'>
            {/* <h1>this is login page</h1> */}
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={onChange} aria-describedby="emailHelp" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' value={credentials.cpassword} onChange={onChange} minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary" >Signup</button>
            </form>
        </div>
  )
}

export default Signup;
