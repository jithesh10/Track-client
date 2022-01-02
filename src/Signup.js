import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import Login from './Login';

function Signup(){
    const[username,setusername]=useState('');
    const[password,setpassword]=useState('');
    const[pwd,setpwd]=useState('');

    const add = () =>{
        const ck_password =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
        if(username==="")
            alert("Please Enter the Username");
        else if(!ck_password.test(password)){
            alert("Password must contain minimum 8 characters and one lowercase letter,uppercase letter,number and special character.");
        }
        else if(password!==pwd){
            alert("Please Re-enter the password correctly");
        }
        else{
            Axios.post("http://localhost:3001/signup",{
            username:username,
            password:password
            }).then(function (response) {
                if(response.data!=="Failed"){
                    alert("Account Created successfully.");
                    ReactDOM.render(<Login/>,document.getElementById('root'));
                }
                else
                    alert("This Username already exists");
            });
        }
    };
    
    return(
        <div id="root1">
            <h1>Signup</h1>
            <label>Username: </label>
            <input type="text" onChange={(event)=>{
                setusername(event.target.value);
            }}/><br/><br/>
            <label>Password: </label>
            <input type="password" onChange={(event)=>{
                setpassword(event.target.value);
            }}/><br/><br/>
            <label>Confirm Password: </label>
            <input type="password" onChange={(event)=>{
                setpwd(event.target.value);
            }}/><br/><br/>
            <button className="btn" onClick={add}>Submit</button>
        </div>
    );
}

export default Signup;


