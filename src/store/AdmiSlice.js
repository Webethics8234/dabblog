import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import jwt from 'jwt-decode' 

const baseURL= process.env.REACT_APP_API_ENDPOINT;

// admin thunk started 


// admin profile data 

export const adminProfiledata = createAsyncThunk('adminprofile/adminprofiledata', async (adminprofileid)=>{



    const adminListentoken = localStorage.getItem('adminLogin')
    // console.log(adminListentoken)

    const admindata = await axios.get(`${baseURL}/admin/profile/${adminprofileid}`,{

        headers:{

            'token':adminListentoken

        }

    })

    const adminedit = admindata.data.data.user
    console.log(adminedit)

    return adminedit 



} )

export const fetchadminCategary = createAsyncThunk('admincat,admincategary',async ()=>{

    const getadminCat = await axios.get(`${baseURL}/admin/category_listing`,)

    const response = getadminCat.data.data
    console.log(response)
    
    return response


})

export const admingetBlog = createAsyncThunk('getblog/getblogs', async (params)=>{

    console.log(params)
   
    const adminListentoken = localStorage.getItem('adminLogin')
    // console.log(adminListentoken)
    const response = await axios.get (`${baseURL}/admin/all_blog_listing?page=${params.count}`,{

        headers:{

            'token':adminListentoken

        }

    })
    const dresponse = {response:response.data.data  ||  [] , delet:params.delete }
    console.log(dresponse.response)
    

    //  const dresponse = response.data.data

    

    return dresponse

        
       

    

} )


export const admineditBlog =createAsyncThunk('adminedit/admineditblog', async (editblogid)=>{

    const adminlisttoken = localStorage.getItem('adminLogin')


    const editData = await axios.get(`${baseURL}/admin/single_blog?slug=${editblogid}`,{

        headers:{

            'token':adminlisttoken

        }

    })

    const getres = editData.data.blog
    console.log(getres)

    return getres 


} )



// admin thunk end 


const initialState = {

    adminedtdata:[],
    admingetCatg:[],
    adminblogData:[],
    admineditdata:[],
    loadmore:false


}


const adminSlice = createSlice({

    initialState,
    name:'admin',
    extraReducers : (builder)=>{


   builder
   .addCase(adminProfiledata.pending,(state,action)=>{


     console.log('your admin profile data is pending ')

   })
   .addCase(adminProfiledata.fulfilled,(state,action)=>{

    state.adminedtdata = action.payload
    console.log('admin profile data is fullfilled')
        

   })
   .addCase(adminProfiledata.rejected,(state,action)=>{

     console.log('admin profile data is rejecadminblogDatated')


   })
   .addCase(fetchadminCategary.pending,(state,action)=>{

    console.log('admin catgory is pending')

   })
   .addCase(fetchadminCategary.fulfilled,(state,action)=>{

    state.admingetCatg = action.payload
    console.log('catogary data is fullfilled')

   })
   .addCase(fetchadminCategary.rejected,(state,action)=>{

    console.log('data is rejected')

   })
   .addCase(admingetBlog.pending,(state,action)=>{

    console.log('admin all blog pending')

   })
   .addCase(admingetBlog.fulfilled,(state,action)=>{
    // console.log('jfk')

    console.log(action.payload,'ihtdiehgt')
    console.log(action.payload.delet)
    //state.loadmore = action.payload

    if(action.payload.response.length ==0 ){

     state.loadmore = true
 
    }

    if(action.payload.delet ===true ){

        state.adminblogData = action.payload.response
        console.log('delet if function')

    }
    else{

        state.adminblogData.push(... action.payload.response)
        console.log('else functronfjkfh')

    }




    // console.log(action.payload,'dhfhghdhghjh')

    
    // if(delet = true){

    //     state.adminblogData = action.payload.dresponse

    // }else{

    //     state.adminblogData.push(...action.payload)

    // }
    // state.adminblogData.push(...action.payload)

    
   
   })
   .addCase(admingetBlog.rejected,(state,action)=>{

    console.log('admin data is rejected')

   })
   .addCase(admineditBlog.pending,(state,action)=>{

    console.log('admin edit blof data is pendig')

   })
   .addCase(admineditBlog.fulfilled,(state,action)=>{

    console.log('admin edit blog data is fullfilled')
    state.admineditdata = action.payload

   })
   .addCase(admineditBlog.rejected,(state,action)=>{

    console.log('data is rejected')

   })


    }

})


export default adminSlice.reducer
