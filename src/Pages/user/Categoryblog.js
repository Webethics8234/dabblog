import React, { useEffect,useState } from 'react'
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import  {fetchCategaryList}  from '../../store/BlogSlice';

import moment from 'moment';
import Header2 from '../../Component/Header2';
import { Footer } from '../../Component/Footer';
import { NavLink } from 'react-router-dom'


export const Categoryblog = () => {

    const {categoryid} = useParams()
    console.log(categoryid)

    const categarydata = useSelector((state)=>state.blog.userCategarylist)
    console.log(categarydata)

    const [alldata,setAlldata] = useState([])
    console.log(alldata)

    const dispatch = useDispatch()

    useEffect(()=>{

      if(categarydata){

         setAlldata(categarydata)

      }

    },[categarydata])


    useEffect(()=>{

     dispatch(fetchCategaryList(categoryid))

    },[categoryid])



    const readingTime = (item)=>{

        const text = item.length
        // console.log(text)
        const wpm = 100
  
        const time = Math.ceil(text/wpm) 
  
         return time
  
  
      }


  return (
    <div>
        <Header2/>

        <div  className='container ' style={{height:'78vh',overflow:'scroll',width:'100%'}}  >

        {

         alldata.map((item,index)=>{

            return (

                <div key={index} style={{paddingTop:'45px', paddingBottom:'45px'}} className="  row bl-blog_wrap">
                <div className="col-12 col-lg-7 mb-4 mb-sm-0">
                  <div className="bl-featured-img mb-3 mb-lg-0">
                    <NavLink to={`/user/blog/${item.slug}`} className='navlink_image' >
                      <img className="img img-fluid" style={{width:'550px',height:'450px'}} src={item?.feature_image} alt="feature image" />
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
                      {readingTime(item.description)} MIN READ 
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
                     {/* {item?.description}  */}
                     { item?.description.replace(/<[^>]+>/g, '')}
                  </div>
                  <div className="d-flex justify-content-between w-100">
                    <div style={{textTransform:'capitalize'}} className="my-auto blog_by">
                      {item.posted_by.name}
                    </div>
                    <div className="pr-2">
                      <div className="">
                        <button className="categories-tag btn btn-outline-success" ><NavLink style={{textDecoration:'none' ,color:'black'}} to={`/user/category/${item?.category_id?._id}`} > {item.category_id.category_name} </NavLink> </button>
                      </div>
                    </div>
                  </div>
                </article>

              
              </div>
             
             
             </div>

            )
 
         })

        }
          
          </div>

     <Footer  />

    </div>
  )
}
