import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCount } from '../../Reducer/Reducer';
import './Dashboard.css'

const Dashboard = () => {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [searchData, setSearchData] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {

        getData()
    }, [])

    function getData() {
        fetch("http://localhost:3005/employees")
            .then(res => res.json())
            .then(res => {
                console.log(res.length)
                dispatch(getCount(res.length))
                setData(res)
                setSearchData(res)
            })
            .catch((err => {
                console.log(err)
            }))
    }
    function searchHandler(event) {
        const text = event.target.value.toLowerCase();

        const b = searchData.filter((info) => {
            if (info.name.toLowerCase().indexOf(text) !== -1) {
                return info
            }

        });

        setData(b)

    }


    return (
        <>
            <center>


                <input className='m-3' type="search" placeholder='search here by name' onChange={(event) => searchHandler(event)} />
               
                <h3>Table</h3>
              
                    <div className='d-flex justify-content-center'>
                      <div className='d-flex flex-column'>
                          
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqmaT0kkdC9DMnYTf2ks6mgrx4j9V0x0mwwg&usqp=CAU" />
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjfgZicV5XnpMTpJIlPp9t_XAt5N8-XKTmCQ&usqp=CAU"/>
                      <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSghp9PdWkMvW3UOodC9C99KBgxYa_y3BJRGA&usqp=CAU'/>
                      </div>

                    
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Password</th>
                            </tr>
                        </thead>
                        <tbody cellSpacing='10px' cellPadding='10px'>
                            {data.map((each) => {
                                return (
                                    <tr key={each._id}><td>{each.name}</td>
                                        <td  >{each.email}</td>
                                        <td  >{each.password}</td>
                                    </tr>

                                )
                            })}
                        </tbody>
                    </table>
                    </div>
            </center>
        </>
    )
}

export default Dashboard