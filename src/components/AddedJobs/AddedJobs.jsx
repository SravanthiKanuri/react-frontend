import axios from 'axios'
import React, { useEffect, useState } from 'react';
import Jobs from '../Jobs/Jobs';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { totaljobs } from '../../Reducer/Reducer2';
import './AddedJobs.css'
import { useNavigate } from 'react-router-dom';

const AddedJobs = () => {
    // const defaultValues = {
    //     companyName: "a",
    //     rolename: "x",
    //     experience:"s",
    //     skills:"d",
    //     location:"e",
    //     jobmode:"w",
    //     eligibility:"s"
    //    }
       const [data, setData] = useState([])
       const dispach = useDispatch()
        const navigate=useNavigate()

       useEffect(()=>{
        getJobs()
       },[])
      function getJobs() {
        axios.get("http://localhost:3005/jobs")
        .then(res=>{
            console.log(res.data.length)
            dispach(totaljobs(res.data.length))
            setData(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
      }

       function onDeleteJob(id) {
       // console.log(id)
     axios.delete("http://localhost:3005/jobs/"+id)
    
     .then(res=>{
        console.log(res)
        window.location.reload();
        
     })
     .catch((err)=>{
        console.log(err)
     })

       }

       function onEditJob(id) {
          navigate("/home/about/"+id)
       }


  return (
    <>
    {/* {data.map((each)=> {
            
    
        return ( */}
        <Container>
            
                <Row>
                    
                    {data.map((each)=>{
                        return (
                            <Col md={6} lg={3} key={each._id} className="bg-container1">

                            <p>{each.companyName}</p>
                            <h3>{each.rolename}</h3>
                            <p>{each.experience}</p>
                            <p><span><i className="bi bi-house-fill"></i>{each.jobmode}</span></p>
                            <p><span><i className="bi bi-geo-alt"></i>{each.location}</span></p>
                            <p>{each.eligibility}</p>
                            <p>{each.skills}</p>
                            <p>{each.postedBy}</p>
    
                            <button className='btn btn-danger' onClick={()=>onDeleteJob(each._id)}>Delete</button>
                            <button className='btn btn-warning' onClick={()=>onEditJob(each._id)}>Edit</button>
    
                        </Col>
                    
                        )
                    })}
                  
                  
                 
                  </Row> 
            
        </Container>
      
     {/* <ul>
        {data.map((val)=>{
            return (
                <li>{val.rolename}</li>
            )
        })}
     </ul> */}
    </>
  )
}

export default AddedJobs