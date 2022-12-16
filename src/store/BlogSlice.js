
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import jwt from 'jwt-decode' 





const baseURL= process.env.REACT_APP_API_ENDPOINT;


// user thunk detail start

export const getBlog = createAsyncThunk('blog/blogs', async (count)=>{

    const listtoken = localStorage.getItem('Login')
    // console.log(listtoken) const listtoken = localStorage.getItem('Login')

    const response = await axios.get (`${baseURL}/admin/all_blog_listing?page=${count}`,{

        headers:{

            'token':listtoken

        }

    })
     
    const dresponse = response.data.data || []
    // console.log(dresponse)


    return dresponse


} )



export const fetchCategary = createAsyncThunk('cat/catgary',async ()=>{

    const getCat = await axios.get(`${baseURL}/admin/category_listing`)
    
    const response = getCat.data.data

    return response

})

export const editBlog = createAsyncThunk('edit/edit',async (editblogid)=>{

    const listtoken = localStorage.getItem('Login')

    const editData = await axios.get(`${baseURL}/admin/single_blog?slug=${editblogid}`,{

        headers:{

            'token':listtoken

        }

    })

     const getres = editData.data.blog
      
     console.log(getres)
    
    return getres

} ) 


 export const userProfileData = createAsyncThunk('userprofileData/profiledata', async (decodeid)=>{
   
    const listtoken = localStorage.getItem('Login')
    // console.log(decodeid)
    // const decode = jwt(listtoken)
    // console.log(decode)
    // const decodeid = decode.id
    // console.log(decodeid)
    
    const profileData  = await axios.get(`${baseURL}/api/user/profile/${decodeid}`,{

        headers:{

            'token':listtoken

        }

    })


    const useredit = profileData.data.data.user
    console.log(useredit)
    return useredit


 } )


// user profile id edit thunk 

 export const userSummary = createAsyncThunk( 'summary/usersummarydata', async (slugid)=>{
    console.log(slugid)

    const listtoken = localStorage.getItem('Login')

     const summaryresponce = await axios.get(`${baseURL}/admin/blog_detail?slug=${slugid}`,{

        headers:{

           'token':listtoken

        }

     })

     console.log(summaryresponce)
     const fainalsummary = summaryresponce.data.blog
     console.log(fainalsummary)
     


     return fainalsummary


 } )


 export const fetchCategaryList = createAsyncThunk('categorylist/fetchCategaryList',async (categorylistid)=>{

    const responseCategory = await axios.get(`${baseURL}/admin/blog_list_by_category?category_id=${categorylistid}`)

    // console.log(responseCategory)

    const fainalresponseCategory = responseCategory.data.data
    console.log(fainalresponseCategory)

    return fainalresponseCategory


 } )


//  user thunk detail end 



const initialState = {

    // user initial state 
     
    blogData : [],
    getCateg:[],
    editData:[],
    edtuserdata:[],
    summarydata:[],
    userCategarylist:[],
    loadingmore:false

    // user initial state end 


}

const blogSlice = createSlice({

    name:'blog',
    initialState,
    extraReducers:(builder)=>{

    //    userData start 
        
        builder
        .addCase(getBlog.pending,(state,action)=>{

              

            // console.log('data is pending')

        })
        .addCase(getBlog.fulfilled,(state,action)=>{
            // console.log(state.blogData)
            if(action.payload.length ==0 ){

                state.loadingmore = true

            }


            state.blogData.push(...action.payload)
            // console.log('data is fullfilled')

        })
        .addCase(getBlog.rejected,(state,action)=>{

            // console.log('data is rejected')

        })
        .addCase(fetchCategary.pending,(state,action)=>{

            // console.log('data is pending')

        })
        .addCase(fetchCategary.fulfilled,(state,action)=>{

            state.getCateg = action.payload
            // console.log('data is fullfilled')

        })
        .addCase(fetchCategary.rejected,(state,action)=>{

            // console.log('data is rejected')

        })
        .addCase(editBlog.pending,(state,action)=>{

            // console.log('data is pendig')

        })
        .addCase(editBlog.fulfilled,(state,action)=>{

            state.editData = action.payload
            // console.log('data is fullfilled')

        })
        .addCase(editBlog.rejected,(state,action)=>{

            // console.log('data is rejected')

        })
        .addCase(userProfileData.pending,(state,action)=>{

            // console.log('data is pendig')

        })
        .addCase(userProfileData.fulfilled,(state,action)=>{

          state.edtuserdata=action.payload

        })
        .addCase(userProfileData.rejected,(state,action)=>{

            // console.log('user data is rejected')

        })
        .addCase(userSummary.pending,(state,action)=>{

            // console.log('data is pendig')

        })
        .addCase(userSummary.fulfilled,(state,action)=>{

            // console.log('data is fullfilled ')
            state.summarydata = action.payload

        })
        .addCase(userSummary.rejected,(state,action)=>{

            //   console.log('data is rejected')

        })
        .addCase(fetchCategaryList.pending,(state,action)=>{

            // console.log('categary list pendig')

        })
        .addCase(fetchCategaryList.fulfilled,(state,action)=>{

            state.userCategarylist=action.payload
            // console.log('categary list fullfilled')

        })
        .addCase(fetchCategaryList.rejected,(state,action)=>{

            // console.log('categary list rejected')

        })


        // userData end 




    }

})
export default blogSlice.reducer