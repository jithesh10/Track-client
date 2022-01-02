import React,{ useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Axios from "axios";
import Login from './Login';
import './App.css';

function App(props) {
  const [title,settitle]= useState('');
  const [description,setdescription]= useState('');
  const[projectlist,setprojectlist]=useState([]);

  const [hours,sethours]=useState('');
  const [project,setproject]=useState('');
  const [status,setstatus]=useState('');

  useEffect(()=>{
    Axios.get("http://localhost:3001/read").then((res)=>{
      setprojectlist(res.data);
    })
  });

  const add=()=>{
    alert("Added Successfully.");
    Axios.post("http://localhost:3001/insert",{
      title:title,
      description:description
    });
  };

  const submit=()=>{
    if(project==="Select a Project"||project==="")
      alert("Please select a project");
    else if(status==="Select a Status"||status==="")
      alert("Please select a status");
    else{
      alert("Updated Successfully.");
      Axios.post("http://localhost:3001/add",{
      project:project,
      hours:hours,
      status:status,
      name:props.projectuser
    });
    }
  };

  const exit = ()=>{
    ReactDOM.render(<Login/>,document.getElementById('root'));
  }

  return (
    <div id="root">
      <h1>Welcome {props.projectuser}</h1>
      <button className="btn placing" onClick={exit}>Log Out</button>
      <div id='root1'>
      <h1>Add an Initiative:</h1>
      <label>Initiative Title: </label>
      <input type="text" onChange={(event)=>{
        settitle(event.target.value);
      }} /><br /><br/>
      <label>Initiative Description: </label>
      <input type="text" onChange={(event)=>{
        setdescription(event.target.value);
      }} /><br/><br/>
      <button className="btn" onClick={add}>Add</button>
      </div>
      <div id='root1'>
      <h1>Update Details of the Project:</h1>
      <label>Name of the Project: </label>
      <select  onChange={(event)=>{
        setproject(event.target.value);
      }} >
        <option>Select a Project</option>
      {projectlist.map((val,key)=>{
        return <option>{val.title}</option>
      })}
      </select><br/><br/>
      <label>Number of hours spent: </label>
      <input type="number" onChange={(event)=>{
        sethours(event.target.value);
      }} /><br/><br/>
      <label>Status of the Project: </label>
      <select onChange={(event)=>{
        setstatus(event.target.value);
      }}>
        <option>Select a Status</option>
        <option>Yet to be started</option>
        <option>Ongoing</option>
        <option>Completed</option>
      </select><br/><br/>
      <button className="btn" onClick={submit}>Submit</button>
      </div>
    </div>
  );
}

export default App;
