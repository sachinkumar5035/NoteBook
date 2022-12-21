import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = (props) => {


    const[credentials,setCredentials] = useState({email:"", password:""});
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // to reload the page
        console.log("onsubmit clicked");
        // API call for login a user API=>  http://localhost:4000/api/auth/login no login required
        const response = await fetch("http://localhost:4000/api/auth/login", {
            method: 'POST',
            // header me content type hi dena h bs
            headers: {
              'Content-Type': 'application/json'
            }, 
            // API ki body me email and password dena h ki user login ho ske 
            body: JSON.stringify({email:credentials.email,password:credentials.password})
          });
          const json = await response.json();
          console.log(json);
          if(json.success){
            // save the credentials in local storage(will use further to authenticate a user)and redirect to home
            localStorage.setItem('token',json.authtoken);
            navigate("/"); // redirect to home page
            props.showAlert("Log in successfuly","success");
          }
          else{
            props.showAlert("Invalid creadentials","danger");
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
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} minLength={5} required  />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )


}

export default Login;
