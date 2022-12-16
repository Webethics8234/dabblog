import React,{useEffect,useState,useRef} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchadminCategary } from '../../store/AdmiSlice';
import Header2 from '../../Component/adminlayout/Header2';
import { Footer } from '../../Component/Footer';


const Adminbloglist = () => {

  const adminlogintoken = localStorage.getItem('adminLogin')
  console.log(adminlogintoken)

  const firstRef = useRef(null)
  const secondRef = useRef(null)
  const thirdRef = useRef(null)
  const fourthRef = useRef(null)
  const fifthRef = useRef(null)


  const initialvalue = { title:'',discription:'',textarea:'' }
  const [ formValue,setFormValue ]= useState(initialvalue)
  const [upload,setUpload] = useState('')
  const [boolean,setBoolean] =useState(true)
  const [ catid,setCatid ]= useState('')

  const [titleError,setTitleError] = useState(false)
  const [ discriptionError,setDiscriptionError ]= useState(false)
  const [ textareaError,setTextareaError ] = useState(false)
  const [ optionError,setOptionError ]  = useState(false)
  const [imageError,setImageError] = useState(false)

  const admingetCategary = useSelector((state)=>state.adminblog.admingetCatg)
  console.log(admingetCategary)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const baseURL= process.env.REACT_APP_API_ENDPOINT;

  useEffect(()=>{

    dispatch(fetchadminCategary())

  },[])


  const handleChange =(e)=>{
 
    // console.log(e.target)
   
     const {name,value} = e.target
     setFormValue({...formValue,[name]:value})
     // console.log(formValue)
   



   }
   const handleImage = (e)=>{
    console.log(e.target.files[0])
   setUpload(e.target.files[0])
   console.log(upload)
  



   }

   const handleBoolean =(e)=>{

       console.log(e.target.value)
       setBoolean(e.target.value)

   }

   const handleCat =(e)=>{
    
     console.log(e.target.value)
     setCatid(e.target.value)

   }



   const blogSubmit = (e)=>{
 
    e.preventDefault()
   //  e.target.reset()

    if(formValue?.title?.length === 0 ){

       setTitleError(true)

    }else{
      setTitleError(false)
    }


    if(formValue?.discription?.length < 6 ){

     setDiscriptionError(true)

    }else{

      setDiscriptionError(false)

    }



    if(formValue?.textarea?.length <10 ){

     setTextareaError(true)

    }else{

      setTextareaError(false)

    }



    if(upload ==''){

     setImageError(true)

    }
    else{

      setImageError(false)

    }

    if ( formValue?.title?.length !== 0 && formValue?.discription?.length > 6 && formValue?.textarea?.length >10  ){

     const formData = new FormData()
     formData.append('title',formValue.title)
     formData.append('feature_image',upload)
     formData.append('publish',boolean)
     formData.append('category_id',catid)
     formData.append('short_description',formValue.discription)
     formData.append('description',formValue.textarea)
     
    
 
     axios.post(`${baseURL}/admin/add_blog`,formData,
     
     
     {

      headers: {
        "token": adminlogintoken
      

    
}
     })
     .then((response)=>{

      console.log(response)
      
      firstRef.current.value=''
      secondRef.current.value=''
      // thirdRef.current.value = ''
      fourthRef.current.value = ''
      fifthRef.current.value = ''
      // dispatch(getBlog())
      navigate('/admin/adminblogdetail')
      
      

     })
     .catch((error)=>{

      console.log(error)

     })

     setFormValue('')


    }
   
    // dispatch (getBlog())

   
   



  }


  return (
    <div>

      <Header2/>

     
     <div className='add_blog_height' >

<div className='container' >
 
 <div className='bloglist' >

    <div className='blog_heading' >
     <h1> Add your blog </h1>

     <form onSubmit={blogSubmit} encType="multipart/form-data" >

       <div className='blog_ui' >
          
        <div className='form-group' >
         <label> Your Title </label>
         <input className='form-control' ref={firstRef} type='text' placeholder='Enter your title' name='title' value={formValue?.title}  onChange={handleChange} />
         {titleError && <p style={{color:'red'}} > Please enter your title </p> }
        </div>

        <div className='form-group' >
          <label>  Feature Image </label>
          <input className='form-control' ref={secondRef} type='file' accept=".jpg, .jpeg, .png"  name='file' onChange={handleImage}   />
          {imageError && <p style={{color:'red'}} > Please upload your blog image </p>}
        </div>

        {/* <div className='form-group' >
          <label>  Status </label>
          <select className='form-control' ref={thirdRef}   onChange={handleBoolean} >
            <option value='' > chose status </option>
            <option value='true' > publish </option>
            <option value='false' > draft </option>
          
          </select>
          { optionError && <p style={{color:'red'}} > please chose publish option  </p> }
        </div> */}

        <div className='form-group' >
          <label>  Categary </label>
        <select className='form-control' onChange={handleCat} > 
        <option value='' > Chose category </option>
       {
       
        admingetCategary.map((item,index)=>{

          return (
            <option value={item._id } >  {item.category_name} </option>
          )

        })
        
       }
        </select>
       </div>

        <div className='form-group' >
          <label> Short_Discription </label>
          <input className='form-control' ref={fourthRef} type='text' placeholder='Please enter your short discription' name='discription' value={formValue?.discription} onChange={handleChange}  />
           { discriptionError && <p style={{color:'red'}} >  Please enter your discription </p> }
        </div>

        <div className='blform-groupog_field' >
         <label> Write Your Discription </label>
         <textarea className='form-control' ref={fifthRef} name='textarea' placeholder='Please enter your text here ' value={formValue?.textarea} onChange={handleChange}  > </textarea>
         { textareaError   && <p style={{color:'red'}} > Please enter minimum 10 charector </p> }
        </div>

       <button className='btn btn-primary mt-2 mx-auto d-block mb-1 ' > Submit </button> 

       </div>

     </form>

    </div>

 </div>

 

</div>

     </div>
  

 <Footer/>

    </div>
  )
}

export default Adminbloglist                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                