import React, { useEffect, useState } from 'react'
// import Login from '../Pages/Login'
import { NavLink,useNavigate } from 'react-router-dom'
import jwt from 'jwt-decode' 
import { adminProfiledata } from '../../store/AdmiSlice'
import { useSelector,useDispatch } from 'react-redux'
import Dropdown from 'react-bootstrap/Dropdown';
import image3 from '../../images/image3.jpg'
import adminheaderlogo from '../../images/adminheader.jpg'



const Header2 = () => {

  const adminedit = useSelector((state)=>state.adminblog.adminedtdata)
  // console.log(adminedit)
  const[admineditdata,setadmineditdata]=useState([])
  // console.log(admineditdata)

   
  const dispatch = useDispatch()

   const adminLogin = localStorage.getItem('adminLogin')

   const [decodetoken,setDecodetoken] = useState()
  //  console.log(decodetoken)

   const navigate = useNavigate()

   
   const [adminid,setadminid] = useState()
  //  console.log(adminid)

   useEffect(()=>{

    dispatch(adminProfiledata(adminid))

   },[adminid])
    
    useEffect(()=>{

    if(adminLogin){

      const decode = jwt(adminLogin)

      setDecodetoken(decode) 
      setadminid(decode.id)

    }
    if(adminedit){

      setadmineditdata(adminedit)

    }

    },[adminLogin,adminedit])

    

    const signOut =()=>{
      localStorage.removeItem('adminLogin')
      navigate('/admin')
    }

     const gotoProfile =()=>{

      navigate('/admin/adminprofile')

     }

     const addBlog =()=>{

      navigate('/admin/adminaddblog')
    
    }


  return (
   <div>
      <div className='header' >

          {!adminLogin ? '' : ( <div className='header_logo' >
          <img width='50px' height='50px' style={{borderRadius:'50%'}} src={adminheaderlogo} />
          </div> ) }  



    <div  style={{display:'flex' ,justifyContent:'center' ,alignItems:'center'  }} >
 
  { !adminLogin ? (<h2 style={{fontSize:'20px' }}  className='header_login' > <NavLink to='/admin' > Login </NavLink> </h2> ): '' }


 
<div className='heder3_arrangement  'style={{gap:'42px'}} >

 {/* { adminLogin ?  <h2> <NavLink style={{textTransform:'capitalize'}} to='/admin/adminprofile' > { admineditdata?.name } </NavLink> </h2> : '' }  */}

    { !adminLogin ? '' : ( <h1  > <NavLink style={{textDecoration:
    'none',color:'white',fontSize:'20px'}}  to='/admin/adminblogdetail' > Admin Blog </NavLink> </h1> ) }   


      { !adminLogin ? '' : ( <div class="dropdown show">
  
  
  <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic" className='mt-2' >
        <img style={{borderRadius:'52%'}} height='35' width='35' src={image3} />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item style={{textTransform:'capitalize' }} > <p style={{textAlign:'center',boxSizing:'border-box', marginTop:'4px'}} >{ admineditdata?.name }</p>  </Dropdown.Item>
        <Dropdown.Item >  <button onClick={signOut} className='btn btn-outline-danger' style={{borderRadius:'15px',height:'40px' ,width:'80px',marginLeft:'21px'}}  > SignOut </button> </Dropdown.Item>
        <Dropdown.Item > <button onClick={gotoProfile} className='btn btn-outline-info' style={{borderRadius:'15px',height:'40px' ,width:'80px',marginLeft:'21px'}}  > Profile </button>  </Dropdown.Item>

        {/* <Dropdown.Item >  <button  style={{borderRadius:'15px',height:'40px' ,width:'80px'}}  className='btn btn-outline-danger mt-1' onClick={addBlog} > Add Blog </button> </Dropdown.Item> */}

        {/* <Dropdown.Item > <button onClick={gotoHome} className='btn btn-primary' style={{borderRadius:'52%',height:'35px' ,width:'150px'}}  > Home </button> </Dropdown.Item> */}
      </Dropdown.Menu>
    </Dropdown>

  
</div>) }  


   </div>

   

 

    
  



          </div>



      </div>
   </div>
  )
}

export default Header2