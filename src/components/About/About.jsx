import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate()
  const params = useParams()
  let singleUserDetails;
 const defaultValues = {
  companyName: "",
  rolename: "",
  experience:"",
  skills:"",
  location:"",
  jobmode:"",
  eligibility:""
 }
 const [data, setData] = useState(defaultValues);
 const [userErr, setUserErr] = useState({})
 const id = params.id
// console.log(id)
useEffect(()=>{
  
axios.get("http://localhost:3005/jobs/"+id)
.then(res=>{
  //console.log(res)
  singleUserDetails = res.data ;
  setData(res.data)
  console.log(singleUserDetails)
})
.catch(err=>{
  console.log(err)
})



},[id])
function changeHandle(e) {
  setData({...data, [e.target.name]: e.target.value})
}

const token = localStorage.getItem("token")

function submitHandler(e) {
  e.preventDefault(); 
 
let a=validateJob(data)

let b={}
if(JSON.stringify(b)!==JSON.stringify(a)){
  console.log(a);
  setUserErr(a);

}
else{
  if (id) {
    console.log(id);    
    console.log(data)
    axios.put("http://localhost:3005/jobs/"+id, data)
    .then(res=>{
      console.log(res)
      navigate('/home/addedjobs')
    })
    .catch(err=>{
      console.log(err)
    })
    return
  }
 
  

 
  
    console.log("hi")
    axios.post("http://localhost:3005/jobs/new", data, { headers : {
    Authorization: 'Bearer ' + token,
    "Content-Type" : 'application/json'
    } 
  })
    
    .then(res=>{
      console.log(res)
      navigate('/home/addedjobs')
    })
    .catch(err=>{
      console.log(err)
    })
  //}
  }
}

function validateJob(data){
  const err = {};
  if (!data.companyName) {
    err.companyName = "required";
  }
  if (!data.rolename) {
    err.rolename = "required";
  }
  if (!data.experience) {
    err.experience = "required";
  }
  if (!data.skills) {
    err.skills = "required";
  }
  if (!data.location) {
    err.location = "required";
  }
  if (!data.jobmode) {
    err.jobmode = "required";
  }
  if (!data.eligibility) {
    err.eligibility = "required";
  }

 //console.log(err)
 //setUserErr(err)
 // return err;
 //console.log(userErr)
 return err;
}



  return (
    <>

      <div className='text-center'>
        <form onSubmit={submitHandler}>
          <label>Company Name</label><br/>
          <input type="text" placeholder='Enter company name' name='companyName' value={data.companyName} onChange={changeHandle}/><br/>
          <p className='text-danger'>{userErr.companyName}</p>
          <label>Role name</label><br/>
          <input type="text" placeholder='ex. Frontend developer' name='rolename' value={data.rolename} onChange={changeHandle}/><br/>
          <p className='text-danger'>{userErr.companyName}</p>
          <label>Skills</label><br/>
          <input type="text" placeholder='EX. html, css, etc' name='skills' value={data.skills} onChange={changeHandle}/><br/>
          <p className='text-danger'>{userErr.companyName}</p>
          <label>Experience</label><br/>
          <input type="text" placeholder='years' name='experience' value={data.experience} onChange={changeHandle}/><br/>
          <p className='text-danger'>{userErr.companyName}</p>
          <label>Job mode</label><br/>
          <input type="text" placeholder='Ex. WFH or WFO or Hybrid' name='jobmode' value={data.jobmode} onChange={changeHandle}/><br/>
          <p className='text-danger'>{userErr.companyName}</p>
          <label>Location</label><br/>
          <input type="text" placeholder='enter location' name='location' value={data.location} onChange={changeHandle}/><br/>
          <p className='text-danger'>{userErr.companyName}</p>
          <label>Eligibility</label><br/>
          <input type="text" placeholder='year of pass' name='eligibility' value={data.eligibility} onChange={changeHandle}/><br/>
          <p className='text-danger'>{userErr.companyName}</p>
          <button className='button'>Submit</button>
        </form>
      </div>
    </>
  )
}

export default About
