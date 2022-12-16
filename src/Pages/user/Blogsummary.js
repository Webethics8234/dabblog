import React, { useEffect, useState } from "react";
import { useParams,NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userSummary } from "../../store/BlogSlice";
import moment from 'moment';
import Header2 from "../../Component/Header2";
import { Footer } from "../../Component/Footer";

const Blogsummary = () => {
  const { blogsummaryid } = useParams();
  console.log(blogsummaryid);

  const {categoryid} = useParams()
    console.log(categoryid)

  const dispatch = useDispatch();
  const summarydata = useSelector((state) => state.blog.summarydata);
  console.log(summarydata)
  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    dispatch(userSummary(blogsummaryid));
  }, [blogsummaryid]);
  useEffect(() => {
    if (summarydata) {
      setData(summarydata);
    }
  }, [summarydata]);

  const hendletext = (item)=>{

    return {__html:item}

  }

  const RenderHTML = (props) => (<span dangerouslySetInnerHTML={{__html:props.HTML}}></span>)

  return (
    <div>

     <Header2/>

   


       {

       <div className="blog-detail-wrapper pt-2 " style={{height:'78vh'}} >

        <div style={{backgroundColor:'rgb(248, 248, 255)'}} className='mt-2px' >

            <div className="container" >
               
               <div className="row" style={{padding:'50px' ,boxSizing:'border-box'}} >

                 <div className="col-5  d-flex  flex-column align-items-center "  style={{justifyContent:'space-between'}} >
                    


                   <div className="bd-info" >

                    <div className="mb-2" >

                    <button className="categories-tag btn btn-outline-success" ><NavLink style={{textDecoration:'none' ,color:'black'}} to={`/user/category/${data?.category_id?._id}`} > {data?.category_id?.category_name} </NavLink> </button>
                        {/* <button className="btn btn-outline-success" >  {data?.category_id?.category_name} </button>  */}
                        


                    </div>

                     <h1 style={{textTransform:'capitalize'}} >  {data?.title}  </h1>

                     <div className="blog_heading_footer col-6" >
                      

                        <div> { moment(data?.posted_date).format('LL')} </div> 
                        <div className="ml-2" style={{textTransform:'capitalize'}} > by {data?.posted_by?.name} </div>

                     </div>
                     
                   </div>

                  
                 

                 </div>

                 <div className="col-7" >

                   <img style={{width:'550px',height:'450'}} src={data?.feature_image} />

                 </div>


               </div>

            </div>

        </div>

        <div className="container pt-5 " >

            <div className="row" >
                
                <div className="col-12" >
                {/* {data.description} */}
                {/* { data?.description.replace(/<[^>]+>/g, '')} */}

                <RenderHTML  HTML={data?.description} /> 


                </div>

            </div>

        </div>

       </div>

       }

     <Footer/>

    </div>
  );
};

export default Blogsummary;
