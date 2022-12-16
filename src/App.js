
import './App.css';
// @import "~bootstrap/scss/bootstrap";


import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
// import Header from './Component/Header';
// import Login from './Pages/Login'
// import Registation from './Pages/Registation';
// import Profile from './Pages/Profile';
// import BlogList from './Pages/BlogList';


// user data start 

// import Header from './Component/Header';
import Login from './Pages/user/Login'
import Registation from './Pages/user/Registation';
import Profile from './Pages/user/Profile'
import BlogList from './Pages/user/BlogList';
import Home from './Pages/Frontend/Home';
import AllBLogDetail from './Pages/user/AllBLogDetail';
import Errors from './Component/Errors';
import Editblog from './Pages/user/Editblog';
import About from './Pages/user/About';
import Blogsummary from './Pages/user/Blogsummary';
import { Categoryblog } from './Pages/user/Categoryblog';

// user data end 

// admin data start 

import Adminlogin from './Pages/admin/Adminlogin';
import Adminprofile from './Pages/admin/Adminprofile';
import Adminbloglist from './Pages/admin/Adminbloglist';
import Adminblogdetail from './Pages/admin/Adminblogdetail';
import Admineditblog from './Pages/admin/Admineditblog'





// admin data end 


const App = () => {
  return (
   
   <BrowserRouter>
   
    <Routes>

     {/* user route start      */}
    <Route path='/' element={<Home/>}/>
    <Route path='/user' element={<Login/>} />
    <Route path='/user/registation' element={<Registation/>} />
    <Route path='/user/profile' element={<Profile/>} />
    <Route path='/user/addblog' element={<BlogList/>} />
    <Route path='/user/allblogdetail' element={<AllBLogDetail/>}  />
    <Route path='/user/editblog/:editblogid' element={ <Editblog/> } />
    <Route path='/user/aboutus' element={<About/>} />
    <Route path='/user/blog/:blogsummaryid' element={<Blogsummary/>} />
    <Route path='/user/category/:categoryid' element={ <Categoryblog/> } />
    <Route path='*' element={<Errors/>} />

    {/* user route end  */}

    {/* admin route start  */}

    
    <Route path='/admin' element={<Adminlogin/>}  />
    <Route path='/admin/adminprofile' element={ <Adminprofile/> } />
    <Route path='/admin/adminaddblog' element={<Adminbloglist/> } />
    <Route path='/admin/adminblogdetail' element={<Adminblogdetail/>} />
    <Route path='/admin/admineditblog/:admineditblogid' element={<Admineditblog />} />


    {/* admin route end  */}
   
    </Routes>

   </BrowserRouter>

  )
}

export default App