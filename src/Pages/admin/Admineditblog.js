import React,{useEffect, useState,useRef,useMemo} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { fetchadminCategary,admineditBlog } from '../../store/AdmiSlice';
// import Blogdetailheader from '../../Component/adminlayout/Blogdetailheader';
import Header2 from '../../Component/adminlayout/Header2';
import { Footer } from '../../Component/Footer';

import JoditEditor from 'jodit-react';

// import { EditorState } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'


// import { ContentState, convertToRaw } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import { convertToHTML } from 'draft-convert'

const Admineditblog = () => {

  const adminlogintoken = localStorage.getItem('adminLogin')


  const baseURL= process.env.REACT_APP_API_ENDPOINT;

  // editor content 
  const editor = useRef(null)

  const  [content,setContent] = useState('')

  // const config ={

    

  // }


  const {admineditblogid} = useParams()
  // console.log(admineditblogid)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // const [data,setData] = useState([])


  // useEffect(()=>{

  //  dispatch(fetchadminCategary())
  //  dispatch(admineditBlog(admineditblogid))

  // },[admineditblogid])

  const getCategary = useSelector((state)=>state.adminblog.admingetCatg)
  // console.log(getCategary)


  const getsingledata = useSelector((state)=>state.adminblog.admineditdata)
    console.log(getsingledata)

    const [alldata,setAlldata] = useState([])
    console.log(alldata)

    const [data,setData] = useState([])
    // const [ singleImage,setSingleImage ] = useState()
    // console.log(singleImage)

    useEffect(()=>{

        if(getsingledata){
          
          setAlldata(getsingledata)
          // setData(getsingledata)
          setStartingImage(getsingledata.feature_image)

        }
        if(alldata){

          setFormValue(initialvalue)
          setContent(alldata.description)

        }
        console.log(content)




    },[getsingledata,alldata])

    useEffect(()=>{
      
      dispatch(fetchadminCategary())
      dispatch(admineditBlog(admineditblogid))

   

    },[admineditblogid])
    // console.log(data)


   const singlecatid = getsingledata?.category_id?._id
    // console.log(singlecatid)

    const singlestatus = getsingledata?.publish
    // console.log(singlestatus)

    const blog_id = getsingledata?._id
  //  console.log(blog_id)



   const initialvalue = { title:alldata?.title,discription:alldata?.short_description,textarea:alldata?.description }
   console.log(initialvalue)
  
  
   const [ formValue,setFormValue ]= useState(initialvalue)
   console.log(formValue)



   
  //  console.log(formValue)

  //  const [upload,setUpload] = useState('')
   const [boolean,setBoolean] =useState(true)
  //  const [ catid,setCatid ]= useState('')
 
   const [titleError,setTitleError] = useState(false)
   const [ discriptionError,setDiscriptionError ]= useState(false)
   const [ textareaError,setTextareaError ] = useState(false)
  //  const [ optionError,setOptionError ]  = useState(false)
   const [imageError,setImageError] = useState(false)

   const [singlecat,setSinglecat]= useState(singlecatid)
  //  const [ statusid,setStatusid ] = useState(singlestatus)
   

  // image states  start

  const [startingImage,setStartingImage] = useState('')
  // console.log(startingImage)

  const [upload,setUpload] = useState('')
  const [ singleImage,setSingleImage ] = useState('')
  // console.log(singleImage)

  // image state end 


  const handleChange =(e)=>{
 
    // console.log(e.target)
   
     const {name,value} = e.target
    //  console.log(name)
     setFormValue({...formValue,[name]:value})
     console.log(formValue)

     
   



   }

  //  JoditEditor 

  const JoditEditorhandle =  (e)=>{

    console.log(e)
   
    // console.log(e.target.value)
    // const data = e.target.value
    setContent(e)

  }
   console.log(content)


  //  console.log(editorState)
   const handleImage = (e)=>{
    console.log(e.target.files[0])
   setUpload(e.target.files[0])
   

    //  setSingleImage(upload)


   }

   useEffect(()=>{

      if( ! upload){

      setSingleImage(undefined)
      return

      }

      const objurl = URL.createObjectURL(upload)
      setSingleImage(objurl)



   },[upload])
  //  console.log(upload)
  //  console.log(singleImage)


   const handleCat =(e)=>{
    
    //  console.log(e.target.value)
     setSinglecat(e.target.value)

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


    //  if(boolean ==''  ){

    //   setOptionError(true)

    //  }

     if(upload ==''){

      setImageError(true)

     }else{

      setImageError(false)

     }console.log(formValue?.title)

     if ( formValue?.title?.length > 0 && formValue?.discription?.length > 6 && formValue?.textarea?.length > 0  ){

      const formData = new FormData()
      formData.append('title',formValue.title)
      if (upload){

       formData.append('feature_image',upload) 

      }
      
      formData.append('publish',boolean)
      formData.append('category_id',singlecatid)
      formData.append('short_description',formValue.discription)
      formData.append('description',content)
      
     
  
      axios.put(`${baseURL}/admin/update_blog?blog_id=${blog_id}`,formData,
      
      
      {
 
       headers: {
         "token": adminlogintoken
       
 
     
 }
      })
      .then((response)=>{
 
       console.log(response)
       dispatch(admineditBlog(admineditblogid))
       navigate('/admin/adminblogdetail')

       
       
       
       
 
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

      
      <div  className='editblog_height' >


      <div className='container' >
 
 <div className='bloglist' >

    <div className='blog_heading' >
     <h1 style={{textAlign:'center'}} > Add Blog </h1>

     <form onSubmit={blogSubmit} encType="multipart/form-data" >

       <div className='blog_ui' >
          
        <div className='form-group' >
         <label> Your Title </label>
         <input className='form-control'  type='text' placeholder='Enter your title' name='title' value={formValue?.title}  onChange={handleChange} />
         {titleError && <p style={{color:'red'}} > please enter your title </p> }
        </div>

        {/* <div className='form-group' >
          <label>  Feature Image </label>
          <input className='form-control' type='file'  name='file' onChange={handleImage}   />
          {imageError && <p style={{color:'red'}} > please upload your blog image </p>}
        </div> */}


        { !upload ? <img className='m-1' height='120px' src={startingImage} />  : <img className='m-1' height='120px' src={singleImage} /> }
        <div className='form-group' >
          <label>  Feature Image </label>
          <input className='form-control' type='file'  name='file' onChange={handleImage}   />
          {/* {imageError && <p style={{color:'red'}} > please upload your blog image </p>} */}
        </div>

        {/* { !upload ? <div> <img className='m-1'  height='120px'  src={startingImage}  />
         <div className='form-group' >
          <label>  Feature Image </label>
          <input className='form-control' type='file'  name='file' onChange={handleImage}   />
          {imageError && <p style={{color:'red'}} > please upload your blog image </p>}
        </div> </div>: <div> <div className='form-group' >
        < img  className='m-1' height='120px' src={singleImage} />
          <label>  Feature Image </label>          
          <input className='form-control' type='file'  name='file' onChange={handleImage}   />
          {imageError && <p style={{color:'red'}} > please upload your blog image </p>}
        </div> </div> } */}

     

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
          <label>  Category </label>
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
          <input className='form-control' type='text' placeholder='Please enter your short discription' name='discription' value={formValue?.discription} onChange={handleChange}  />
           { discriptionError && <p style={{color:'red'}} >  please enter your discription </p> }
        </div>

        {/* <div className='blform-groupog_field' >
         <label> Discription </label>
         <textarea className='form-control'  name='textarea' placeholder='Please enter your text here '  onChange={handleChange} value={formValue?.textarea} >  </textarea>
         { textareaError   && <p style={{color:'red'}} > please enter minimum 10 charector </p> }
        </div> */}

<JoditEditor
			ref={editor}
			value={content}
      // name='textarea'
			// config={config}
			tabIndex={1} // tabIndex of textarea
			// onBlur={newContent => setContent(newContent=>setContent(newContent))} // preferred to use only this option to update the content for performance reasons
			// onChange={newContent => {}}

      onChange={JoditEditorhandle}

		/>

    {/* {content} */}




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

export default Admineditblog