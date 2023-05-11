import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCount } from '../../Reducer/Reducer';

const Dashboard = () => {
    const [data, setData] = useState([])
    const [search,setSearch]=useState('')
    const [searchData, setSearchData] = useState([])
    const dispatch = useDispatch()
    useEffect(()=>{
        
        getData()
    },[])

    function getData(){
        fetch("http://localhost:3005/employees")
        .then(res=>res.json())
        .then(res=>{
            console.log(res.length)
            dispatch(getCount(res.length))
            setData(res)
            setSearchData(res)
        })
        .catch((err=>{
            console.log(err)
        }))
    }
    function searchHandler(event) {
       const text=event.target.value.toLowerCase();

        const b=searchData.filter((info)=>{
            if(info.name.toLowerCase().indexOf(text)!==-1){
                return info
            }
              
            });
      
       setData(b)

    }


  return (
    <>
    <center>
    <input type="search" onChange={(event)=>searchHandler(event)}/>
    <h3>Table</h3>
    <table border='10px' cellSpacing='12px' cellPadding='15px'>
        <thead>
            <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            </tr>
        </thead>
        <tbody cellSpacing='10px' cellPadding='10px'>
        {data.map((each)=>{
            return (
                    <tr key={each._id}><td>{each.name}</td>
                    <td  >{each.email}</td>
                    <td  >{each.password}</td>
                    </tr>
                
            )
        })}
        </tbody>
    </table>
    </center>
    </>
  )
}

export default Dashboard