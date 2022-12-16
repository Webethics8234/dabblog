import React, { useEffect, useState,useRef } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header2  from "../../Component/Header2";
import { Footer } from "../../Component/Footer";
import { useSelector, useDispatch } from "react-redux";
import { userProfileData } from "../../store/BlogSlice";
import Login from "./Login";
import damiImage from "../../images/image3.jpg";
// import { userProfileData } from "./../../store/BlogSlice";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from "react-bootstrap";

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Profile = () => {
  const edituser = useSelector((state) => state.blog.edtuserdata);
  const [editdata, seteditdata] = useState([]);

  const [nameis, setnameis] = useState();
  const [loading, setLoading] = useState(false);

  const [editImage, seteditImage] = useState(false);
  const [uploadimage, setUploadimage] = useState("");
  const [responseimage, setResponseimage] = useState("");
  console.log(responseimage);

  const [prevalue,setPrevalue] = useState('')

  // cropper section 
  
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState('');

  const [ enterName,setEnterName ] = useState(false)
  

  useEffect(() => {
    if (edituser) {

     

      seteditdata(edituser);
      setnameis(edituser.name);
      setResponseimage(edituser.profile_image);
      console.log(edituser, "kdgsagjnc.lkvgj");
    }

    if(responseimage){

      setCropper(responseimage)

    }

  }, [edituser]);

  // console.log(nameis,"opopop")

  // console.log(edituser.name,"tested edit ")
  const dispatch = useDispatch();

  const navigate = useNavigate(null);
  const [userid, setUserid] = useState();
  const Login = localStorage.getItem("Login");

  const initialValue = { editnamevalue: nameis };
  // console.log(initialValue)
  const [edit, setEdit] = useState(initialValue);

  //  profile success localStorage item 

   const profilesuccess = localStorage.getItem('profilesuccess')

  const baseURL = process.env.REACT_APP_API_ENDPOINT;

  const Loginfunc = () => {
    if (Login) {
      const decode = jwt_decode(Login);
      console.log(decode);

      console.log(decode.id, "uujuujjjujuuj");
      setUserid(decode?.id);
    }
  };
  console.log(userid);



  useEffect(() => {
    // console.log(Login)
    Loginfunc();

    //  if(profilesuccess){

    //     toast.success('Success Notification !', {
    //           position: toast.POSITION.TOP_RIGHT
    //       });

    //       const removeItem = localStorage.removeItem('profilesuccess')

    //  }

        
      
     

    

    if (!Login) {
      navigate("/");
    } else {
      Loginfunc();
      // response()
    

      dispatch(userProfileData(userid));
    }
  }, [userid]);

    

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(nameis.length <=2){

      setEnterName(true)

    }

    if(nameis.length > 2 ){

        setLoading(true);

    console.log(userid);

    axios
      .put(
        `${baseURL}/admin/user/update/${userid}`,
        { name: nameis },
        {
          headers: {
            token: Login,
          },
        }
      )
      .then((response) => {
        console.log(response, "trttttt");

        toast.success(" your name is  successfully update", {
          position: toast.POSITION.TOP_RIGHT,
        });

        dispatch(userProfileData(userid));
        setTimeout(() => {
          setLoading(false);
        }, 100);
        setEnterName(false)
      })

      .catch((error) => {
        console.log(error);
      });

    }

  
  };

  const Handletext = (e) => {
    setnameis(e.target.value);
  };

  const handleEditimage = () => {
    seteditImage(true);
    setPrevalue(responseimage)
  };

  const handleImage = (e) => {
    // console.log(e.target.files[0]);

    // setUploadimage(e.target.files[0]);


    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setUploadimage(reader.result );
    };
    reader.readAsDataURL(files[0]);




  };





  console.log(uploadimage);

  const submitImage = async (e) => {
    e.preventDefault();
    console.log(cropper.getCroppedCanvas().toDataURL());

    const formData = new FormData();

    formData.append("profile_image", cropper.getCroppedCanvas().toDataURL());

    await axios
      .put(`${baseURL}/admin/user/update/${userid}`, formData, {
        headers: {
          token: Login,
        },
      })
      .then((response) => {
        // console.log(response)
        const result = response.data.doc.profile_image;
        console.log(result)

        toast.success(" image update is success!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        setResponseimage(result);
        dispatch(userProfileData(userid))
      })
      .catch((err) => {
        console.log(err);
      });

    seteditImage(false);
  };

  // only temprary function 

   

  const handleClose = ()=>{

    seteditImage(false);
    setUploadimage('')

  }

  // const [cropper,setCropper] = useState('#')

  

  
  return (
    <div>
      <Header2 />
      <ToastContainer />
      <div className="profile">

       

        <Modal show={editImage} onHide={handleClose}>
      <Modal.Header closeButton>
    <Modal.Title> Upload Image </Modal.Title>
  </Modal.Header>
  <Modal.Body>

    { !uploadimage ? <Cropper
          style={{ height: 400, width: "100%" }}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
          src={prevalue}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          onInitialized={(instance) => {
            setCropper(instance);
          }}
          guides={true}
        /> : <Cropper
        style={{ height: 400, width: "100%" }}
        zoomTo={0.5}
        initialAspectRatio={1}
        preview=".img-preview"
        src={uploadimage}
        viewMode={1}
        minCropBoxHeight={10}
        minCropBoxWidth={10}
        background={false}
        responsive={true}
        autoCropArea={1}
        checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
        onInitialized={(instance) => {
          setCropper(instance);
        }}
        guides={true}
      /> }
    
  {/* <Cropper
          style={{ height: 400, width: "100%" }}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
          src={uploadimage}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          onInitialized={(instance) => {
            setCropper(instance);
          }}
          guides={true}
        /> */}

     {editImage && (
         
            <div className="form-group">
             
              <input
                className="form-control"
                type="file"
                name="file"
                onChange={handleImage}
              />


            </div>
            )} 
           </Modal.Body>
  <Modal.Footer>
   
    <button className="btn btn-outline-success col-6 mt-1" onClick={submitImage}  > submit </button>
  </Modal.Footer>

  
        </Modal>
 

          <div style={{display:'flex' ,alignItems:'center', gap:'50px' }} >

         <div style={{display:'flex' ,flexDirection:'column' ,justifyContent:'center',alignItems:'center' }} >

           {!responseimage ? (
             <div >
            <img   width="100px" height="100px" src={damiImage} />
           </div>
          ) : (
          <div className="response_image_user_profile" >
          
            <img width="250px" height="250px" src={responseimage} />
             </div>
            )}

           <button className="mt-5 btn btn-outline-danger " onClick={handleEditimage}>Edit Image.. </button>
     
          
            <h1 style={{textTransform:'capitalize'}} > {nameis}</h1> <br />

            </div>


        <form style={{marginBottom:'150px'}}  onSubmit={handleSubmit}>
          <div class="form-group">
            <label for="exampleInputEmail1"> Name </label>
            <input
              type="text"
              class="form-control"
              name="Name"
              placeholder="Edit your name"
              value={nameis}
              onChange={Handletext}
            />
            {/* <small id="emailHelp" class="form-text text-muted  ">
              Edit your name here
            </small> */}
          </div>
           
            { enterName && <p style={{color:'red'}} > Please enter your name more then 2 charector </p> }

          <button style={{marginLeft:'80px',marginTop:'6px'}}  class="btn btn-primary">Submit </button>
          {loading && <p style={{color:'red'}} > Loading... </p>}
        </form>

        </div>

      </div>

      <Footer />
    </div>
  );
};

export default Profile;
