import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import App from './App';
import Signup from './Signup';

function Login(){
    const[username,setusername]=useState('');
    const[password,setpassword]=useState('');

    const add = () =>{
        Axios.post("https://track-server-tau.vercel.app/login?username="+username+"&password="+password,{
            username:username,
            password:password
        }).then(function (response) {
            if(response.data!=="Failure")
                ReactDOM.render(<App projectuser={response.data} />,document.getElementById('root'));
            else
                alert("Invalid Credentials");
        });
    }

    const redirect=()=>{
        ReactDOM.render(<Signup/>,document.getElementById('root'));
    }
    
    return(
        <div id="root">
            <h1>Welcome to Mr.Cooper!!</h1>
            <div id="root1">
            <h1>Login</h1>
            <label>Username: </label>
            <input type="text" onChange={(event)=>{
                setusername(event.target.value);
            }}/><br/><br/>
            <label>Password: </label>
            <input type="password" onChange={(event)=>{
                setpassword(event.target.value);
            }}/><br/><br/>
            <button className="btn" onClick={add}>Submit</button></div>
            <h1>If you are new then please Signup</h1>
            <button className="btn" onClick={redirect}>Signup</button>
        </div>
    );
}

export default Login;
