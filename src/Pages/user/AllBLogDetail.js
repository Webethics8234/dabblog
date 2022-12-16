import axios from 'axios'

import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import Header2 from '../../Component/Header2'
import { Footer } from '../../Component/Footer'
import { getBlog } from '../../store/BlogSlice'
import { useNavigate,NavLink } from 'react-router-dom'
import { Trash} from 'react-bootstrap-icons';
// import { ToastContainer, toast } from 'react-toast'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Loading from '../../Component/adminlayout/Loading'

// moment js 
import moment from 'moment';
// moment().format();





const AllBLogDetail = () => {

    const getData = useSelector(( state )=> state.blog.blogData )
    console.log(getData)
    const loading = useSelector((state)=>state.blog.loadingmore)

    const navigate = useNavigate()


    const logintoken = localStorage.getItem("Login")
    // console.log(logintoken)
    const baseURL= process.env.REACT_APP_API_ENDPOINT;

    const dispatch = useDispatch()

   
  
    
    const [loadingboolean,setLoadingBoolean] = useState(false)
    const [count,setCount] = useState(1)

    const [textlimit,setTextlimit] = useState('')
    console.log(textlimit)
    
    useEffect(()=>{
      
      // <Loading />
   
     
   
         dispatch(getBlog(count))
      


           

    },[count])

    // useEffect(()=>{

    //  if(getData){

    //   const descriptionlimit = getData.description
    //   const descriptionslice = descriptionlimit.slice(0,30)
    //   setTextlimit(descriptionslice)

    //  }

    // },[getData])

    const deleItem = (id)=>{


             axios.delete( `${baseURL}/admin/delete_blog?blog_id=${id}`,{

                headers:{
        
                    'token':logintoken
        
                }
        
             } )
             .then((response)=>{
        
               console.log(response)
               dispatch(getBlog())

             
        
             })
        
             .catch((error)=>{
        
               console.log(error)
        
             })
   

     console.log(id)

    }
  
    const addBlog =()=>{

        navigate('/user/addblog')

    }


    const readingTime = (item)=>{

      const text = item.length
      // console.log(text)
      const wpm = 100

      const time = Math.ceil(text/wpm) 

       return time


    }

    
   
    const loadingMore = () => {
    
      setLoadingBoolean(true)
  
      setTimeout(()=>{
  
       setCount(count + 1); 
       setLoadingBoolean(false)
  
      },1000)
  
      // dispatch(admingetBlog(count));
      // setMoredata([...moredata,...admingetData])
    };

    // const headingMarkup = (innertagremove)=>{
    //   console.log(innertagremove)

    //   return {__html:innertagremove}
      

    // }

    const RenderHTML = (props) => (<span dangerouslySetInnerHTML={{__html:props.HTML}}></span>)
  
 
  return (
    <div>
        
        < Header2 />

        

      
      <div className='blogdetail ' >
      

      


<div  className='container' style={{width:'100%' , }} >
      {
        getData.length > 0 ? (

          getData.map((item,index)=>{

            return (

              
               
               <div  key={index}  style={{paddingTop:'45px', paddingBottom:'45px'}} className="  row bl-blog_wrap">
                  <div className="col-12 col-lg-7 mb-4 mb-sm-0">
                    <div className="bl-featured-img mb-3 mb-lg-0">
                      <NavLink to={`/user/blog/${item.slug}`} className='navlink_image' >
                        <img style={{width:'550px',height:'450px'}} className="img img-fluid" src={item?.feature_image} alt="feature image" />
                      </NavLink>
                    </div>
                  </div>
               
                <div className="col-12 col-lg-5" style={{position: "relative;"}}>
                
                  <article className="d-flex flex-column justify-content-between h-100">
                    <div className="d-flex justify-content-between mb-3">
                      <div className="blog_date">
                        { moment(item.posted_date).format('LL')}
                      </div>
                      <div className="min_read">
                        {readingTime(item?.description)} MIN READ 
                      </div>
                    </div>
                    <div className="post-content mb-3">
                      <h2 className="post-title text-dark card-title">
                        <NavLink className='blogdetail_navlink_heading text-dark ' to={`/user/blog/${item.slug}`} style={{textTransform:'capitalize'}} >
                          {item?.title}
                        </NavLink>
                      </h2>
                    </div>
                    <div className="post-excerpt mb-4">
                      
                     {/* <div className='texthidden' > <RenderHTML  HTML={item?.description} /> </div> */}
                     <div>  {item?.description.replace(/<[^>]+>/g, '').slice(0,200)}......  </div>
                          <NavLink style={{textDecoration:'none'}} to={`/user/blog/${item.slug}`} >View more</NavLink>  
                     
                      


                    </div>
                    <div className="d-flex justify-content-between w-100">
                      <div style={{textTransform:'capitalize'}} className="my-auto blog_by">
                        {item.posted_by.name}
                      </div>
                      <div className="pr-2">
                        <div className="">
                          <button className="categories-tag btn btn-outline-success" ><NavLink style={{textDecoration:'none' ,color:'black' }} to={`/user/category/${item?.category_id?._id}`} > {item.category_id.category_name} </NavLink> </button>
                        </div>
                      </div>
                    </div>
                  </article>

                
                </div>
               
               
               </div>

              

            )

          })

       ) 

        :<div> <h1> no data found </h1> </div> 
      }


<div className="container" > 

<div className="row" >

 <div className="col-12 d-flex justify-content-center " >

    { loading ? '': <button className="btn btn-outline-danger" onClick={loadingMore}> Lodemore </button>} 
 {loadingboolean && <h1 style={{color:'red'}} > Loading.... </h1> }

 </div>

</div>
  
</div> 

 </div>

 

     </div>

     

     {/* <div className="container" > 

<div className="row" >

 <div className="col-12 d-flex justify-content-center " >

    { loading ? '': <button className="btn btn-outline-danger" onClick={loadingMore}> Lodemore </button>} 
 {loadingboolean && <h1 style={{color:'red'}} > Loading.... </h1> }

 </div>

</div>
  
</div> */}

     
  <Footer/>   

     
    </div>
  )
}

export default AllBLogDetail