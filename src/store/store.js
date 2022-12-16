import { configureStore } from "@reduxjs/toolkit";
import blogSlice from './BlogSlice'
import AdmiSlice from "./AdmiSlice";



export const store = configureStore({

    reducer:{

        blog:blogSlice,
        adminblog:AdmiSlice ,
       

    }

})
