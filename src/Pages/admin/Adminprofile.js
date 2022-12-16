import React,{useState,useEffect} from 'react'
import jwt_decode from "jwt-decode";
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';

import { adminProfiledata } from '../../store/AdmiSlice';
import Header2 from '../../Component/adminlayout/Header2';
import { Footer } from '../../Component/Footer';

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

import { ToastContainer, toast } from 'react-toastify';

const Adminprofile = () => {

  const baseURL= process.env.REACT_APP_API_ENDPOINT;

  const adminedit = useSelector((state)=>state.adminblog.adminedtdata)
  const[admineditdata,setadmineditdata]=useState([])

  const[adminnameis,setadminnameis]=useState()
  const [enterName,setEnterName] = useState(false)


  const [loading,setLoading] = useState(false)


  // Image state started 

  // const [editImage, seteditImage] = useState(false);
  // const [uploadimage, setUploadimage] = useState("");
  // const [responseimage, setResponseimage] = useState("");

  // const [cropper, setCropper] = useState('');


  useEffect(()=>{

    if(adminedit){

      setadmineditdata(adminedit)
      setadminnameis(adminedit.name)
      console.log(adminnameis)

    }

  },[adminedit])

  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [adminid,setadminid] = useState()

  const adminLogin = localStorage.getItem('adminLogin')
  console.log(adminLogin)

  const [tokenDetail,setTokenDetail] = useState()



  // const admindecode = jwt_decode(adminLogin)
  // console.log(admindecode)
  //  setadminid(admindecode.id)
  //  console.log(adminid)
 
   


  const adminLoginfunc = ()=>{
    if (adminLogin){
      const admindecode = jwt_decode(adminLogin)
      console.log(admindecode)
      setTokenDetail(admindecode)
      setadminid(admindecode.id)
      
      console.log(adminid)
    }
  }

  // const signOut =()=>{
  //   localStorage.removeItem('adminLogin')
  //   navigate('/admin')
  // }
  
  useEffect (()=>{
    if(!adminLogin){
      Navigate('/')
    }
    else{
      adminLoginfunc()
      dispatch(adminProfiledata(adminid))
    }
  },[adminid])


  //  console.log(adminnameis?.length)
  
 

  var handleSubmit = async (e)=>{

    e.preventDefault()

    if(adminnameis?.length <=2 ){

      setEnterName(true)

    }

   if(adminnameis?.length > 2 ){ 

    setLoading(true)

    const res = await axios({
      method: 'put',
      url: `${baseURL}/admin/profile/update`,
      data: {
        "admin_id": "63207f9498375d990b73a791",
        "name": adminnameis,
        "email": "rahulsharma.webethics@gmail.com"
      },
      headers: {'token':adminLogin}
  })
  .then((response)=>{

       console.log(response)

       toast.success(" your name is  successfully update", {
        position: toast.POSITION.TOP_RIGHT,
      });
       dispatch(adminProfiledata(adminid))

       setTimeout(() => {
        setLoading(false);
      }, 100);

       setEnterName(false)

  })
  .catch((err)=>{

    console.log(err)

  })
  console.log(res)



  }

 }

  

  const Handletext = (e)=>{
    setadminnameis(e.target.value)
  }

  return (
    <div>
      <Header2/>
      <div className='profile'>

         <div>
         
        {/* <h1 style={{textTransform:'capitalize'}} > {adminnameis} </h1> <br/> */}
        <h1 style={{textTransform:'lowercase'}} > {tokenDetail?.email} </h1>
        
        <form onSubmit={handleSubmit}>
          <div class="form-group">
            <label for="exampleInputEmail1"> Name </label>
            <input type="text" class="form-control"  name='Name'  placeholder="Edit your name" value={adminnameis} onChange={Handletext} />
            {/* <small id="emailHelp" class="form-text text-muted  ">Edit your name here</small> */}
          </div>

         { enterName && <p style={{color:'red'}} > please enter your  name more than 2 charector </p> }

          <button  class="btn btn-primary mt-3 "  >Submit</button>
          {loading && <p style={{color:'red'}} > Loading... </p>}
        </form>
       
        </div>

      </div>
      <Footer/>
    </div>
  )
}

export default Adminprofile