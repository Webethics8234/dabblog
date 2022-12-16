import React, { useEffect, useState } from 'react'
// import Login from '../Pages/Login'
import { NavLink,useNavigate } from 'react-router-dom'
import jwt from 'jwt-decode' 
import Dropdown from 'react-bootstrap/Dropdown';
import { useSelector,useDispatch } from 'react-redux';
// import {userheaderProfileData} from '../store/userHeader2Slice';
import { userProfileData } from '../store/BlogSlice';
import userLogo from '../images/userheader.png'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Header2 = () => {

  const edituser = useSelector((state)=>state.blog.edtuserdata  )
  // console.log(edituser,"YYY")

  const dispatch = useDispatch()

  const[editdata,seteditdata]=useState([])
  

  // const {data} = props
  // console.log(data)

 


  const Login = localStorage.getItem('Login')
  //  console.log(token)
  const navigate = useNavigate()

   const [decodetoken,setDecodetoken] = useState()
  

   const [userid ,setUserid] = useState()
 
   
   useEffect(()=>{

    // dispatch(userheaderProfileData(userid))
    dispatch(userProfileData(userid))

   },[userid])

   useEffect(()=>{
     
    

     if(Login){

      const decode = jwt(Login)
      setDecodetoken(decode)
      setUserid(decode.id)

      

     } 
     if(edituser){

      seteditdata(edituser)

     }
     
   

   },[Login,edituser])



  //  useEffect(()=>{

  //  if (showtoast){

  //   toast.success("Success Notification !", {
  //     position: toast.POSITION.TOP_RIGHT,
  //   });

  //  }  
 
  //  },[showtoast])

   
  //  console.log(decodetoken)

  const signOut =()=>{
    // e.preventDefault();

    localStorage.removeItem('Login')
    navigate('/')

  }

  const gotoProfile = ()=>{

    navigate('/user/profile')

  }

  const gotoHome = ()=>{

    navigate('/')

  }

 
  



  return (
    <div>
       <div className='header' >

<div className='header_logo' >
  <NavLink to='/' style={{textDecoration:'none'}} >  <img width='50px' height='50px' style={{borderRadius:'50%'}} src={userLogo} /> </NavLink> 
</div>

 <div style={{display:'flex' ,justifyContent:'center' ,alignItems:'center' , gap:'20px' }} >

  {/* { !Login ? '' : (<NavLink  to='/' className='text-light' style={{textDecoration:'none'  }} >  <h1 style={{fontSize:'20px' }} >Home </h1>  </NavLink>)  } */}
  <NavLink  to='/' className='text-light' style={{textDecoration:'none'  }} >  <h1 style={{fontSize:'20px' }} >Home </h1>  </NavLink>

  {/* { !Login ? '': (<div>
<NavLink  to='/user/aboutus' className='text-light' style={{textDecoration:'none'  }} >  <h1 style={{fontSize:'20px' }} >About us </h1>  </NavLink>
</div>)  } */}
<div>
<NavLink  to='/user/aboutus' className='text-light' style={{textDecoration:'none'  }} >  <h1 style={{fontSize:'20px' }} >About us </h1>  </NavLink>
</div>
  

<div className='heder3_arrangement' >

 {/* { !Login ? '':  <h2> <NavLink to='/user/profile' > { editdata?.name } </NavLink> </h2>  }  */}

 { !Login ? '' : ( <NavLink to='/user/allblogdetail' style={{textDecoration:'none'}} ><h1 style={{color:'white' ,fontSize:'20px' }} >  Blogs </h1></NavLink>  )  }  


   </div>

   { !Login ?  (<h2 style={{fontSize:'20px' }} > <NavLink  to='/user/registation' > Signup </NavLink>  </h2> ):''}

   { !Login ? (<NavLink style={{textDecoration:'none'}} to='/user' ><h2 style={{fontSize:'20px', color:'white' }}  className='header_login' >  Login </h2></NavLink>  ): '' }



   {/* { !Login ? '' :  */}

   <div className='mt-3' >

   { !Login ? '': ( <div className="dropdown show">
  
  
  <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        <img style={{borderRadius:'52%'}} height='35' width='35' src={editdata?.profile_image} />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item style={{ textTransform:'capitalize', }} > <p style={{textAlign:'center',boxSizing:'border-box', marginTop:'4px'}} >{ editdata?.name }</p>  </Dropdown.Item>
        <Dropdown.Item >  <button onClick={signOut} className='btn btn-outline-danger ' style={{borderRadius:'15px',height:'40px' ,width:'80px',marginLeft:'21px'}}  > SignOut </button> </Dropdown.Item>
        <Dropdown.Item > <button onClick={gotoProfile} className='btn btn-outline-info' style={{borderRadius:'15px',height:'40px' ,width:'80px',marginLeft:'21px'}}   > Profile </button>  </Dropdown.Item>
        {/* <Dropdown.Item > <button onClick={gotoHome} className='btn btn-outline-primary' style={{borderRadius:'15px',height:'40px' ,width:'80px'}}   > Home </button> </Dropdown.Item> */}
      </Dropdown.Menu>
    </Dropdown>

  
</div>)
   
  //  <button onClick={dropdownhandle} style={{borderRadius:'52%',height:'35px' ,width:'35px'}}  >  <img style={{borderRadius:'52%'}} height='35' width='35' src={data} /> </button> )  
}

   <br/> 

   {/* {sign &&  () }   */}
   </div>
   

</div>


</div>
<ToastContainer />
    </div>
  )
}

export default Header2