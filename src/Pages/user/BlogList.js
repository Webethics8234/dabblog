import React,{useEffect,useState,useRef} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getBlog,fetchCategary } from '../../store/BlogSlice'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header2 from '../../Component/Header2';
import { Footer } from '../../Component/Footer'
import AllBLogDetail from './AllBLogDetail'

const BlogList = () => {
   
    const logintoken = localStorage.getItem('Login')
   //  console.log(logintoken)
 
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
 
  //  const getblogdata = useSelector((state)=>state.blog.blogData)
  //  console.log(getblogdata)
   const getCategary = useSelector((state)=>state.blog.getCateg)
   console.log(getCategary)
   const dispatch = useDispatch()

   const navigate = useNavigate()


 
 
   const baseURL= process.env.REACT_APP_API_ENDPOINT;
 
 
     useEffect(()=>{
 
      //  dispatch(getBlog())
       dispatch(fetchCategary())
 
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
  
      }
 
      if(formValue?.discription?.length < 6 ){
 
       setDiscriptionError(true)
 
      }
      if(formValue?.textarea?.length <10 ){
 
       setTextareaError(true)
 
      }
      // if(boolean ==''  ){
 
      //  setOptionError(true)
 
      // }
 
      if(upload ==''){
 
       setImageError(true)
 
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
          "token": logintoken
        
  
      
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
        navigate('/user/allblogdetail')
        
        
  
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
 
       <div className='container'  >
 
      <div className='bloglist' >
 
         <div className='blog_heading' >
          <h1> Your Blog Add and Listig </h1>
 
          <form onSubmit={blogSubmit} encType="multipart/form-data" >
 
            <div className='blog_ui' >
               
             <div className='form-group' >
              <label> Your Title </label>
              <input className='form-control' ref={firstRef} type='text' placeholder='enter your title' name='title' value={formValue?.title}  onChange={handleChange} />
              {titleError && <p style={{color:'red'}} > please enter your title </p> }
             </div>
 
             <div className='form-group' >
               <label>  Feature Image </label>
               <input className='form-control' ref={secondRef} type='file'  name='file' onChange={handleImage}   />
               {imageError && <p style={{color:'red'}} > please upload your blog image </p>}
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
             <option value='' > chose category </option>
            {
            
             getCategary.map((item,index)=>{
 
               return (
                 <option value={item._id } >  {item.category_name} </option>
               )
 
             })
             
            }
             </select>
            </div>
 
             <div className='form-group' >
               <label> Short_Discription </label>
               <input className='form-control' ref={fourthRef} type='text' placeholder='please enter your short discription' name='discription' value={formValue?.discription} onChange={handleChange}  />
                { discriptionError && <p style={{color:'red'}} >  please enter your discription </p> }
             </div>
 
             <div className='blform-groupog_field' >
              <label> Write Your Discription </label>
              <textarea className='form-control' ref={fifthRef} name='textarea' placeholder='please enter your text here ' value={formValue?.textarea} onChange={handleChange}  > </textarea>
              { textareaError   && <p style={{color:'red'}} > please enter minimum 10 charector </p> }
             </div>
 
            <button className='btn btn-primary mt-1 mx-auto d-block ' > Submit </button> 
 
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
 
 export default BlogList