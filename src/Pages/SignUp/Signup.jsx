import React, { useEffect, useState } from 'react';
import '../Login/Login.css';
import { useNavigate } from 'react-router-dom';
//import SignUpPage from '../SignUp/Signup'

const Login = () => {
    const navigate = useNavigate()
    const [userErr, setUserErr] = useState(false)
    //const [isPassword, setIsPassword] = useState(false)
    const values = {
        name:'',
        email:'',
        password:'',
        password1:''
    }
    const [data, setData] = useState(values);
    const [err, setErr] = useState({})
    //const [users, setUsers] = useState({})
    const [isExist, setIsExist] = useState(false)


    function onchangeHandler(event) {
        // const {name, value} = event.target;
        setData({...data, [event.target.name]:event.target.value})
        //setErr(event.target.value)

    }
    // useEffect(()=>{
    //     fetch("http://localhost:3005/employees")
    //     .then(res=>res.json())
    //     .then(res=>{
    //         console.log(res)
    //         setUsers(res)
    //     })
    //     .catch(err=>{
    //         console.log(err)
    //     })
    // },[])

    
    function submitHandler(event) {
        event.preventDefault();
        console.log(JSON.stringify(data))

        setErr(validate(data)) 
        if (err.length!==0) {
            setIsExist(false)
            navigate('/login')  
        }
        else {
            setIsExist(true)
        }
        const options = {
            method: "POST",
            headers: {
               "Content-Type":"application/json" 
            },
            body:JSON.stringify(data)
           
        }
        fetch("http://localhost:3005/employees", options)
        .then((res)=>{return res.json()})
        .then(res=>{
            console.log(res)
            

        })
        .catch(err=>{
            console.log(err)
        })

        fetch("http://localhost:3005/employees/emp",options)
        .then((res)=>res.json())
       .then((res) => {
        console.log(res)
        setNewUser(res)
        
       }
       )
       .catch((err) => {
        console.log(err)
             
       })
                
    }


    
    

       function validate(data){
        const error = {};
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        if (data.email.length===0){
            error.email = "required"
        }
        if (data.name.length===0){
            error.name = "required"
        }
        else if (data.name.length<5) {
            error.name = "Please Enter a valid name"
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
        if (data.password1.length===0){
            error.password1 = "required"
        }
        else if(data.password!==data.password1) {
            error.password1 = "Passwords did not match"
        }
        setIsExist(false)
        return error; 

       }

       function loginPage() {
        navigate("/login")
       }

    return (
        <>
        <form onSubmit={submitHandler}>
            <h2 className='text-center'>Signup Form</h2>

            <div className='d-flex flex-column align-items-center m-5'>
            <label className='p-2' htmlFor="username">Username</label>
                <input type="text" id='username' placeholder='Enter you name' name='name' value={data.name} onChange={onchangeHandler}/>
                <p className='text-danger'>{err.name}</p>
                <label className='p-2' htmlFor="userEmail">Email</label>
                <input type="email" id='userEmail' placeholder='Enter you email' name='email' value={data.email} onChange={onchangeHandler}/>
                <p className='text-danger'>{err.email}</p>
                <label className='p-2' htmlFor="userPassword">Password</label>
                <input type="password" id='userPassword' placeholder='Enter password' name='password' value={data.password} onChange={onchangeHandler}/>
                <p className='text-danger'>{err.password}</p>
                <label className='p-2' htmlFor="userPasswordConfirm">Confirm Password</label>
                <input type="password" id='userPasswordConfirm' placeholder='Enter password' name='password1' value={data.password1} onChange={onchangeHandler}/>
                <p className='text-danger'>{err.password1}</p>
                <div className='p-2'>
                <button className='button'>Submit</button>
                {isExist?<p className='text-danger'>User is already exist</p>:''}
                </div>
                
                
            </div>
        </form>
        <p className='p-2 text-center'>you have alreaddy registered? then   <span><button className='button' onClick={loginPage}>Click Here</button></span> </p>
</>
    )
}

export default Login;