import React,{useEffect, useState} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import {fetchCategary,editBlog } from '../../store/BlogSlice'
import axios from 'axios';
import Header2 from '../../Component/Header2';
import { Footer } from '../../Component/Footer';
import { ToastContainer, toast } from 'react-toast'





const Editblog = () => {

  toast('Hi there 👋')

    const logintoken = localStorage.getItem('Login')

    const baseURL= process.env.REACT_APP_API_ENDPOINT;

    const {editblogid} = useParams()
    console.log(editblogid)

    const getCategary = useSelector((state)=>state.blog.getCateg)
   console.log(getCategary)

  

    const getsingledata = useSelector((state)=>state.blog.editData)
    console.log(getsingledata)

    const [data,setData] = useState([])


   const singlecatid = data?.category_id?._id
    console.log(singlecatid)

    const singlestatus = data?.publish
    console.log(singlestatus)


   const dispatch = useDispatch()

   const navigate = useNavigate()

   const blog_id = data?._id
   console.log(blog_id)



   const initialvalue = { title:data?.title,discription:data?.short_description,textarea:data?.description }
   console.log(initialvalue)
const [ formValue,setFormValue ]= useState()
   useEffect(()=>{

    if(getsingledata  ){

      setData(getsingledata)
      // setFormValue(initialvalue)

    }
    if(data){

      setFormValue(initialvalue)

    }

  },[getsingledata,data])
  console.log(data)
  
  
   
   
   console.log(formValue)
   const [upload,setUpload] = useState('')
   const [boolean,setBoolean] =useState(true)
  //  const [ catid,setCatid ]= useState('')
 
   const [titleError,setTitleError] = useState(false)
   const [ discriptionError,setDiscriptionError ]= useState(false)
   const [ textareaError,setTextareaError ] = useState(false)
  //  const [ optionError,setOptionError ]  = useState(false)
   const [imageError,setImageError] = useState(false)

   const [singlecat,setSinglecat]= useState(singlecatid)
  //  const [ statusid,setStatusid ] = useState(singlestatus)
   

   useEffect(()=>{
 
     dispatch(fetchCategary())
     dispatch(editBlog(editblogid))


   }, [editblogid])


   const handleChange =(e)=>{
 
    // console.log(e.target)
   
     const {name,value} = e.target
     setFormValue({...formValue,[name]:value})
     console.log(formValue)
   



   }
   const handleImage = (e)=>{
    console.log(e.target.files[0])
   setUpload(e.target.files[0])
   console.log(upload)
  



   }


   const handleCat =(e)=>{
    
     console.log(e.target.value)
     setSinglecat(e.target.value)

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
    

     if(upload ==''){

      setImageError(true)

     }

     if ( formValue?.title?.length !== 0 && formValue?.discription?.length > 6 && formValue?.textarea?.length >10 && boolean !='' && upload !=''  ){

      const formData = new FormData()
      formData.append('title',formValue.title)
      formData.append('feature_image',upload)
      formData.append('publish',boolean)
      formData.append('category_id',singlecatid)
      formData.append('short_description',formValue.discription)
      formData.append('description',formValue.textarea)
      
     
  
      axios.put(`${baseURL}/admin/update_blog?blog_id=${blog_id}`,formData,
      
      
      {
 
       headers: {
         "token": logintoken
       
 
     
 }
      })
      .then((response)=>{
 
       console.log(response)
       navigate('/user/allblogdetail')
       
       
       
       
 
      })
      .catch((error)=>{
 
       console.log(error)
 
      })
 
      setFormValue('')


     }

    }




  return (
    <div>

     <Header2/>

      <div className='editblog_height' >
        
        <div className='container' >
 
 <div className='bloglist' >

    <div className='blog_heading' >
     <h1> your Blog add and listig </h1>

     <form onSubmit={blogSubmit} encType="multipart/form-data" >

       <div className='blog_ui' >
          
        <div className='form-group' >
         <label> Your Title </label>
         <input className='form-control'  type='text' placeholder='enter your title' name='title' value={formValue?.title}  onChange={handleChange} />
         {titleError && <p style={{color:'red'}} > please enter your title </p> }
        </div>

        <div className='form-group' >
          <label>  Feature Image </label>
          <input className='form-control' type='file'  name='file' onChange={handleImage}   />
          {imageError && <p style={{color:'red'}} > please upload your blog image </p>}
        </div>

        {/* <div className='form-group' >
          <label>  status </label>
          <select className='form-control'  value={statusid} defaultValue={statusid}  onChange={handleBoolean} >
            <option value='' > chose status </option>
            <option value='true' > publish </option>
            <option value='false' > draft </option>
          
          </select>
          { optionError && <p style={{color:'red'}} > please chose publish option  </p> }
        </div> */}

        <div className='form-group' >
          <label>  Categary </label>
        <select className='form-control' value={singlecat} defaultValue={singlecat} onChange={handleCat} > 
        <option value='' > chose category </option>
       {
       
        getCategary.map((item,index)=>{

          return (
            <option key={index} value={item._id } >  {item.category_name} </option>
          )

        })
        
       }
        </select>
       </div>

        <div className='form-group' >
          <label> Short_Discription </label>
          <input className='form-control' type='text' placeholder='please enter your short discription' name='discription' value={formValue?.discription} onChange={handleChange}  />
           { discriptionError && <p style={{color:'red'}} >  please enter your discription </p> }
        </div>

        <div className='blform-groupog_field' >
         <label> Write Your Discription </label>
         <textarea className='form-control'  name='textarea' placeholder='please enter your text here ' value={formValue?.textarea} onChange={handleChange}  > </textarea>
         { textareaError   && <p style={{color:'red'}} > please enter minimum 10 charector </p> }
        </div>

       <button className='btn btn-primary mt-1 mx-auto d-block ' > submit </button> 

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

export default Editblog