import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { admingetBlog } from "../../store/AdmiSlice";
// import Blogdetailheader from '../../Component/adminlayout/Blogdetailheader'
import Header2 from "../../Component/adminlayout/Header2";
import { Footer } from "../../Component/Footer";
import { Flag, Trash } from "react-bootstrap-icons";

const Adminblogdetail = () => {
    const admingetData= useSelector((state) => state.adminblog.adminblogData);
  // console.log(admingetData);
    const loading = useSelector((state)=>state.adminblog.loadmore)
    console.log(loading)

  const navigate = useNavigate();

  // console.log(moredata);
  const [count, setCount] = useState(1);
  // console.log(count);
  const [loadingboolean,setLoadingBoolean] = useState(false)

  const adminlogintoken = localStorage.getItem("adminLogin");
  // console.log(adminlogintoken);
  const baseURL = process.env.REACT_APP_API_ENDPOINT;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(admingetBlog({count:1,delete:true}));
    // alert('hfjdfgj')
  }, []);

  const deleItem = (id) => {

    console.log(id)

    axios
      .delete(`${baseURL}/admin/delete_blog?blog_id=${id}`, {
        headers: {
          token: adminlogintoken,
        },
      })
      .then((response) => {
        console.log(response);
        dispatch(admingetBlog({count:1,delete:true}));
      })

      .catch((error) => {
        console.log(error);
      });

    console.log(id);
  };

  const addBlog = () => {
    navigate("/admin/adminaddblog");
  };

  const loadingMore = () => {
    
    setLoadingBoolean(true)


    setTimeout(()=>{

     setCount(count + 1); 
     setLoadingBoolean(false)
     
     dispatch(admingetBlog({count:count + 1,delete:false}));
    //  setCount(count + 1); 


    },1000)

    // dispatch(admingetBlog(count));
    // setMoredata([...moredata,...admingetData])
  };

   const headingMarkup =(item)=>{

    return {__html:item}

   }

   const [module,setModule] = useState(false)

   const moduleButton = ()=>{

     setModule(true)

   }
   console.log(module)


  return (
    <div>
      <Header2 />

      <div className="blogdetail ">
        <div className="container ">
          <div className="row">
            
            <div className="col-10"></div>
            <div className="col-2 float-right">
              <button className="btn btn-danger mt-1" onClick={addBlog}>
                
                Add Blog
              </button>
            </div>
          </div>
          <table class="table">
            <thead>
              <tr>
                {/* <th scope="col">#</th> */}
                <th scope="col"> Blog Image </th>
                <th scope="col"> Title </th>
                <th scope="col"> Short Discription </th>
                <th scope="col"> Discription </th>
                {/* <th scope="col"> Blog Image </th> */}
                <th scope="col"> Your Action </th>
              </tr>
            </thead>

            <tbody>
              {
                admingetData?.length > 0 ? (
                  admingetData.map((item, index) => {
                    return (
                      <tr key={index}>
                        {/* <th scope="row">1</th> */}
                        <td>
                          
                          <img
                            height="100px"
                            width="100px"
                            src={item?.feature_image}
                          />
                        </td>
                        <td style={{ textTransform: "capitalize" }}>
                          
                          {item?.title}
                        </td>
                        <td style={{ textTransform: "capitalize" }}>
                          
                          {item.short_description}
                        </td>
                        {/* <td> {item?.description} </td> */}
                        {/* <td dangerouslySetInnerHTML={headingMarkup(item?.description)} ></td>   */}
                        {/* <td>
                          
                          <img
                            height="100px"
                            width="100px"
                            src={item?.feature_image}
                          />
                        </td> */}

                        <td> {  item?.description.replace(/<[^>]+>/g, '').slice(0,100) }...<button  onClick={moduleButton} class="btn btn-primary" data-toggle="modal" data-target="#exampleModal"> View more </button> </td>

                        {/* module  */}

                        { module &&    <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        { item?.description.replace(/<[^>]+>/g, '') }
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>}


                            
                        <td>
                          
                          <div>
                            
                            <button
                              style={{ borderRadius: "10px" }}
                              className="p-1 bg-danger text-light"
                              onClick={() => deleItem(item?._id)}
                            >
                              
                              <Trash /> Delete
                            </button>
                          </div>
                          <div>
                            
                            <button className="btn btn-success mt-1 ">
                              
                              <NavLink
                                style={{ textDecoration: "none" }}
                                className="text-light"
                                to={`/admin/admineditblog/` + item?.slug}
                              >
                                
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-pencil-fill"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                </svg>
                                Edit
                              </NavLink>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr className="table-danger">
                    
                    <td colSpan="5" className="text-center">
                      
                      no data found
                    </td>
                  </tr>
                )
                //  <tr className='center' > <td className='table-danger ' >no data found</td>  </tr>
              }

              
{/* 
              { loading ? '': <button className="btn btn-outline-danger" onClick={loadingMore}> Lodemore </button>} 
              {loadingboolean && <h1> Loading.... </h1> } */}

              

            </tbody>
          </table>

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

      <Footer />
    </div>
  );
};

export default Adminblogdetail;
