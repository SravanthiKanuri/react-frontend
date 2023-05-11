import React, { useEffect, useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
//import SignUpPage from '../SignUp/Signup'

const Login = () => {
    const navigate = useNavigate()
    const [userErr, setUserErr] = useState(false)
    const values = {
        email:'',
        password:''
    }
    const [data, setData] = useState(values);
    const [err, setErr] = useState({})
    const [users, setUsers] = useState({})

    function onchangeHandler(event) {
        const {name, value} = event.target;
        setData({...data, [name]:value})
        //setErr(event.target.value)

    }
    useEffect(()=>{
        fetch("http://localhost:3005/employees")
        .then(res=>res.json())
        .then(res=>{
           // console.log(res)
            setUsers(res)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])


    function submitHandler(event) {
        event.preventDefault();
        setErr(validate(data)) 
        console.log(users)
        users.filter(each=>{
            if(each.email===data.email && each.password===data.password){
                 
                console.log(each)
                console.log("Loggedin Succesfully")
                const options = {
                    method: "POST",
                    body : JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                fetch('http://localhost:3005/login', options)
                        .then(res=>res.json())
                        .then(res=>{
                            console.log(res)
                            localStorage.setItem("token", res.token)
                            navigate('/home')
                            
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                       
                        
            }
            else {
                console.log("did not match")
                setUserErr(true)
                
            }
        })
        
    }

    function signupPage() {
        navigate("/signup")

    }

       function validate(data){
        const error = {};
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        if (data.email.length===0){
            error.email = "required"
           
        }
        if (data.password.length===0){
            error.password = "required"
        }
        else if (data.password.length<3){
            error.password = "password should be min 3 char"
        }
        else if (data.password.length>10){
            error.password = "password should be less than 10char"
        }
        else if(!strongRegex.test(data.password)){
            error.password = "password should contain lowercase, uppercase, number and special character"
        }
        return error; 

       }

    return (
        <>
        <form onSubmit={submitHandler}>
            <p>Srav@123</p>
           <h2 className='text-center'>Login Form</h2>
            <div className='d-flex flex-column align-items-center m-5'>

                <label className='p-3' htmlFor="userEmail">Email</label>
                <input type="email" id='userEmail' placeholder='Enter you email' name='email' value={data.email} onChange={onchangeHandler}/>
                <p className='text-danger'>{err.email}</p>
                <label className='p-3' htmlFor="userPassword">Password</label>
                <input type="password" id='userPassword' placeholder='Enter password' name='password' value={data.password} onChange={onchangeHandler}/>
                <p className='text-danger'>{err.password}</p>
                <div className='p-3'>
                <button className='button' type='submit'>Submit</button>
                </div>
                {userErr?<p className='text-danger me-2'>Email and password didnot match</p>:''}
                
                
                  
            </div>
        </form>
        <p className='p-3 text-center'>Do you want to Register? then   <span><button className='button' onClick={signupPage}>Click Here</button></span> </p>
        </>

    )
}

export default Login;