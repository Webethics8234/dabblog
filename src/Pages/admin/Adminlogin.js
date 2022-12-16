import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Header2 from '../../Component/adminlayout/Header2'
import {Footer} from '../../Component/Footer'

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { ToastContainer, toast } from 'react-toastify';


const Login = () => {
  
  const initialValue = { email:'',password:'' }

   const [fvalue ,setFvalue] = useState(initialValue)
   const [email,setEmail] = useState(false)
   const [password,setPassword] =useState(false)
   const [emailError,setEmailError] = useState(false)
   
   const [error,setEroor] = useState(false)

   const navigate = useNavigate()

   const baseURL= process.env.REACT_APP_API_ENDPOINT;
  // console.log( baseURL )

   

   const handleChange=(e)=>{

      // console.log(e.target.value)    
      const {name,value} = e.target
      // console.log(name)
      // console.log(value)

      setFvalue({...fvalue,[name]:value})
      console.log(value)


   }

    const adminLogin = localStorage.getItem('adminLogin')
    console.log(adminLogin)

    useEffect(()=>{

      if(adminLogin){

        navigate('/admin/adminprofile')

      }

    },[])


   const loginSubmit =(e)=>{

    e.preventDefault()
    

    if(fvalue.email.length ==0 ){


      setEmail(true)
      setEroor(false)

    }
    if(fvalue.password.length<4){

      setPassword(true)

    }
     
    if( fvalue.email.length >0 && fvalue.password.length >4 ){

       axios.post(`${baseURL}/admin/login`,{

      "email":fvalue.email,
      "password":fvalue.password

    })
    .then((response)=>{
      console.log(response.data.token)
      const admintoken = response.data.token
      localStorage.setItem('adminLogin',admintoken)   
      console.log(response.data.success)

      toast.success(" Login successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });

      if(response.data.success ){

        
        navigate('/admin/adminprofile')   

      }


    })
    .catch((error)=>{

      console.log(error.response)
      const erroResponse = error.response

      // setEmailError(erroResponse.data.message)

      setEroor(erroResponse.data.message)
      setEmail(false)
      setPassword(false)
      


      
      // toast.error(" somethings is wrong !", {
      //   position: toast.POSITION.TOP_RIGHT,
      // });


    })

   }

    }

    console.log(error)

   

  return (

    <div  >

      <Header2/>
      
      <div className='login' >

       <form  onSubmit={loginSubmit} >

             <div className='form_heading' >
               <h1> Login Here </h1> <br/>
               {/* { emailError && <p> email not matched </p> } */}
               <p style={{color:'red'}} > {error} </p>
             </div>

             <div className='form_ui' > 
              
              <div className='form-group'  >
                  
                  <label> Email </label>
                  <input  className='form-control' type='email' placeholder='enter your email' name='email' value={fvalue.email} onChange={handleChange}   />
                  {email && <p style={{color:'red'}} > please enter your  email </p> }

              </div>

              <div className='form-group' >
                <label> Password </label>
                <input className='form-control' type='password' placeholder='enter your password' name='password' value={fvalue.password} onChange={handleChange} />
                {password && <p style={{color:'red'}} > please enter your valid password </p> }

              </div>

              <div className='login_button' >
               <button className="btn btn-success" > Login </button>
              </div>
              

             </div>

       </form>   
       
       </div>

       <Footer/>
      
      
    </div>
  )
}

export default Login